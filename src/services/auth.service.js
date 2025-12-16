import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export function loginService({ email, password }) {
  if (!email || !password) {
    throw new HttpError("Faltan credenciales (400)", 400);
  }

  const emailValido = process.env.USUARIO_EMAIL;
  const passwordValida = process.env.USUARIO_PASSWORD;

  if (email !== emailValido || password !== passwordValida) {
    throw new HttpError("Credenciales inválidas (401)", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new HttpError("Falta JWT_SECRET en .env (500)", 500);
  }

  const expiraEnSegundos = 60 * 60; // 1 hora
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: expiraEnSegundos });

  return { token, expiraEn: expiraEnSegundos };
}
