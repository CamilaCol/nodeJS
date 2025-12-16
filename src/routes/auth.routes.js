import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";

const router = Router();

//POST /auth/login
router.post("/login", loginController);

export default router;
