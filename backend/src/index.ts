import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";
import medicoRoutes from "./routes/medicoRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(pacienteRoutes);
app.use(medicoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
