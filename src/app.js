import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import rutasAuth from "./routes/auth.routes.js";
import rutasProductos from "./routes/products.routes.js";
import { rutaNoEncontrada } from "./middlewares/rutaNoEncontrada.middleware.js";
import { manejoErrores } from "./middlewares/errores.middleware.js";

export function crearApp() {
  const app = express();

  //CORS + body-parser JSON
  app.use(cors());
  app.use(bodyParser.json());

  //Ruta simple de salud
  app.get("/health", (req, res) => {
    res.json({ ok: true, mensaje: "API OK" });
  });

  //Rutas
  app.use("/auth", rutasAuth);
  app.use("/api/products", rutasProductos);

  //404 rutas desconocidas
  app.use(rutaNoEncontrada);

  //Manejo central de errores
  app.use(manejoErrores);

  return app;
}
