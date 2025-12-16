import { loginService } from "../services/auth.service.js";

export function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = loginService({ email, password });

    res.json({
      ok: true,
      tipo: "Bearer",
      token: resultado.token,
      expiraEn: resultado.expiraEn
    });
  } catch (error) {
    next(error);
  }
}
