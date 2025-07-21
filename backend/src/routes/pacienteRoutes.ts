import { Router } from "express";
import { cadastrarPaciente, getPaciente } from "../controllers/pacienteController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/paciente", authenticate, cadastrarPaciente);
router.get("/paciente", authenticate, getPaciente);

export default router;