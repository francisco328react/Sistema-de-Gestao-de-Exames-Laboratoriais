import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createAgendamento } from "../controllers/agendamentoController";

const router = Router();

router.post("/agendamento", authenticate, createAgendamento);

export default router;