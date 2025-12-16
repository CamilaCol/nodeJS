import {
  obtenerProductosService,
  obtenerProductoPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService
} from "../services/products.service.js";

export async function obtenerProductosController(req, res, next) {
  try {
    const productos = await obtenerProductosService();
    res.json({ ok: true, productos });
  } catch (error) {
    next(error);
  }
}

export async function obtenerProductoPorIdController(req, res, next) {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    res.json({ ok: true, producto });
  } catch (error) {
    next(error);
  }
}

export async function crearProductoController(req, res, next) {
  try {
    const productoCreado = await crearProductoService(req.body);
    res.status(201).json({ ok: true, producto: productoCreado });
  } catch (error) {
    next(error);
  }
}

export async function actualizarProductoController(req, res, next) {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoService(id, req.body);
    res.json({ ok: true, producto: productoActualizado });
  } catch (error) {
    next(error);
  }
}

export async function eliminarProductoController(req, res, next) {
  try {
    const { id } = req.params;
    await eliminarProductoService(id);
    res.json({ ok: true, mensaje: "Producto eliminado con éxito" });
  } catch (error) {
    next(error);
  }
}
