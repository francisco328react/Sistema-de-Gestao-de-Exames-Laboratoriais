import { Router } from "express";
import { cadastroMedico } from "../controllers/medicoController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/medico", authenticate, cadastroMedico);

export default router;