import { Router } from "express";
import { downloadLaudo } from "../controllers/laudoController";

const router = Router();

router.post("/laudo/pdf", downloadLaudo);

export default router;