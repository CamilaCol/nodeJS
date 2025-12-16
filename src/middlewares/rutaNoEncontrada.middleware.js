export function rutaNoEncontrada(req, res) {
  res.status(404).json({
    ok: false,
    mensaje: "Ruta no definida (404)"
  });
}
