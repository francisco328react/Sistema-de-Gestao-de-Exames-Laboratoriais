import { Router } from "express";
import { cadastroMedico, getMedicos, updateMedico, deleteMedico } from "../controllers/medicoController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/medico", authenticate, cadastroMedico);
router.get("/medico", authenticate, getMedicos);
router.put("/medico/:id", authenticate, updateMedico);
router.delete("/medico/:id", authenticate, deleteMedico);

export default router;