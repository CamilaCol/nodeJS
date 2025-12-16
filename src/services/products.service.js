import { HttpError } from "../utils/httpError.js";
import {
  obtenerProductosModelo,
  obtenerProductoPorIdModelo,
  crearProductoModelo,
  actualizarProductoModelo,
  eliminarProductoModelo
} from "../models/products.model.js";

function tomar(body, claveEs, claveEn) {
  return body?.[claveEs] ?? body?.[claveEn];
}

function validarId(id) {
  if (!id) throw new HttpError("Falta el id (400)", 400);
}

function armarProducto(body, { parcial = false } = {}) {
  const titulo = tomar(body, "titulo", "title");
  const categoria = tomar(body, "categoria", "category");
  const descripcion = tomar(body, "descripcion", "description");
  const imagen = tomar(body, "imagen", "image");

  let precio = tomar(body, "precio", "price");
  if (precio !== undefined) precio = Number(precio);

  //Validación mínima
  if (!parcial) {
    if (!titulo || !categoria || precio === undefined || Number.isNaN(precio)) {
      throw new HttpError("Body inválido: se requiere titulo/precio/categoria (400)", 400);
    }
  }

  if (precio !== undefined && Number.isNaN(precio)) {
    throw new HttpError("El campo precio debe ser numérico (400)", 400);
  }

  //Construcción (solo lo que venga definido)
  const producto = {};
  if (titulo !== undefined) producto.titulo = titulo;
  if (categoria !== undefined) producto.categoria = categoria;
  if (descripcion !== undefined) producto.descripcion = descripcion;
  if (imagen !== undefined) producto.imagen = imagen;
  if (precio !== undefined) producto.precio = precio;

  return producto;
}

export async function obtenerProductosService() {
  return await obtenerProductosModelo();
}

export async function obtenerProductoPorIdService(id) {
  validarId(id);

  const producto = await obtenerProductoPorIdModelo(id);
  if (!producto) throw new HttpError("Producto no encontrado (404)", 404);

  return producto;
}

export async function crearProductoService(body) {
  const producto = armarProducto(body, { parcial: false });
  producto.creadoEn = new Date().toISOString();

  return await crearProductoModelo(producto);
}

export async function actualizarProductoService(id, body) {
  validarId(id);

  const existe = await obtenerProductoPorIdModelo(id);
  if (!existe) throw new HttpError("Producto no encontrado (404)", 404);

  const cambios = armarProducto(body, { parcial: true });
  if (Object.keys(cambios).length === 0) {
    throw new HttpError("No enviaste campos para actualizar (400)", 400);
  }

  cambios.actualizadoEn = new Date().toISOString();
  return await actualizarProductoModelo(id, cambios);
}

export async function eliminarProductoService(id) {
  validarId(id);

  const existe = await obtenerProductoPorIdModelo(id);
  if (!existe) throw new HttpError("Producto no encontrado (404)", 404);

  await eliminarProductoModelo(id);
}
