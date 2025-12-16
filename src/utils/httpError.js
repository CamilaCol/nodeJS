export class HttpError extends Error {
  constructor(mensaje, estado = 500) {
    super(mensaje);
    this.estado = estado;
  }
}
