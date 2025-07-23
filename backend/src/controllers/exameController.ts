import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createExame(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req.user as any)?.userId;

        const { nome, resultado, data, pacienteId } = req.body;

        const exame = await prisma.exame.create({
            data: {
                nome,
                resultado,
                data: new Date(data),
                pacienteId, paciente: {
                connect: { id: pacienteId },
                },
                user: {
                connect: { id: userId },
                },
            }
        });

        res.status(200).json(exame);
        return
    } catch (error) {
        console.error("Erro ao criar exame:", error);
        res.status(500).json({ error: "Erro ao criar exame" });
        return
    }
}