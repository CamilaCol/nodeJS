import { crearApp } from "../src/app.js";

const app = crearApp();

//Handler para Vercel (Serverless)
export default function handler(req, res) {
  return app(req, res);
}