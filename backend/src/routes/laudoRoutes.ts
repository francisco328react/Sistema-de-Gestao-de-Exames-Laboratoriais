import { Router } from "express";
import { downloadLaudo, getLaudos } from "../controllers/laudoController";

const router = Router();

router.post("/laudo/pdf", downloadLaudo);
router.get("/laudos", getLaudos);

export default router;