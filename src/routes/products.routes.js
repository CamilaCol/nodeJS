import { Router } from "express";
import { autenticarToken } from "../middlewares/autenticacion.middleware.js";
import {
  obtenerProductosController,
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController
} from "../controllers/products.controller.js";

const router = Router();

//Proteger rutas
router.use(autenticarToken);

//GET /api/products
router.get("/", obtenerProductosController);

//GET /api/products/:id
router.get("/:id", obtenerProductoPorIdController);

//POST /api/products/create
router.post("/create", crearProductoController);

//PUT /api/products/:id (para cumplir CRUD completo)
router.put("/:id", actualizarProductoController);

//DELETE /api/products/:id
router.delete("/:id", eliminarProductoController);

export default router;
