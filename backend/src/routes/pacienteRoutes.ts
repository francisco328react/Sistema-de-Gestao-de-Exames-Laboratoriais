import { Router } from "express";
import { cadastrarPaciente, getPaciente, atualizarPaciente, deletarPaciente } from "../controllers/pacienteController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/paciente", authenticate, cadastrarPaciente);
router.get("/paciente", authenticate, getPaciente);
router.put("/paciente/:id", authenticate, atualizarPaciente);
router.delete("/paciente/:id", authenticate, deletarPaciente);

export default router;