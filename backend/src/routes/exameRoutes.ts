import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createExame, getAllExames, updateExame, deleteExame } from "../controllers/exameController";

const router = Router();

router.post("/exame", authenticate, createExame);
router.get("/exame", authenticate, getAllExames);
router.put("/exame/:id", authenticate, updateExame);
router.delete("/exame/:id", authenticate, deleteExame);

export default router;