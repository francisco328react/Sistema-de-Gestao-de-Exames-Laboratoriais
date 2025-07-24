import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createExame, getAllExames, updateExame, deleteExame, lancarLaudo, updateLaudoExame } from "../controllers/exameController";

const router = Router();

router.post("/exame", authenticate, createExame);
router.get("/exame", authenticate, getAllExames);
router.put("/exame/:id", authenticate, updateExame);
router.delete("/exame/:id", authenticate, deleteExame);
router.put("/exame/:id/laudo", authenticate, lancarLaudo);
router.put("/:id/laudo", authenticate, updateLaudoExame);

export default router;