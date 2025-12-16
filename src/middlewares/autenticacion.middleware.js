import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export function autenticarToken(req, res, next) {
  const encabezado = req.headers.authorization;

  if (!encabezado) {
    return next(new HttpError("Falta el token (401). Usá: Bearer <token>", 401));
  }

  const [tipo, token] = encabezado.split(" ");

  if (tipo !== "Bearer" || !token) {
    return next(new HttpError("Formato inválido (401). Usá: Bearer <token>", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (e) {
    next(new HttpError("Token inválido o expirado (403)", 403));
  }
}
