import { Router } from "express";
import { cadastrarPaciente } from "../controllers/pacienteController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/paciente", authenticate, cadastrarPaciente);

export default router;