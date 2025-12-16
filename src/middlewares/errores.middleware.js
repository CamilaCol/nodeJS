import { HttpError } from "../utils/httpError.js";

export function manejoErrores(error, req, res, next) {
  const esHttpError = error instanceof HttpError;
  const estado = esHttpError ? error.estado : 500;

  const mensaje = esHttpError
    ? error.message
    : "Error interno del servidor (500)";

  if (estado >= 500) {
    console.error(error);
  }

  res.status(estado).json({ ok: false, mensaje });
}
