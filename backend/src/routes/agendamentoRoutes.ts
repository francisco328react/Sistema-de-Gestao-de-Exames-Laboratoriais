import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createAgendamento, getAllAgendamentos, getAgendamentoById, updateAgendamento, deleteAgendamento } from "../controllers/agendamentoController";

const router = Router();

router.post("/agendamento", authenticate, createAgendamento);
router.get("/agendamento", authenticate, getAllAgendamentos);
router.get("/agendamento/:id", authenticate, getAgendamentoById);
router.put("/agendamento/:id", authenticate, updateAgendamento);
router.delete("/agendamento/:id", authenticate, deleteAgendamento);

export default router;