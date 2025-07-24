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

export async function getAllExames(req: Request, res: Response): Promise<void> {
    try {
        const exames = await prisma.exame.findMany({
            include: {
                paciente: true,
                user: true,
            },
        });

        res.status(200).json(exames);
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar exames" });
        return
    }
}

export async function updateExame(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, resultado, data } = req.body;

    try {
        const exame = await prisma.exame.update({
            where: { id },
            data: { nome, resultado, data },
        });

        res.status(200).json(exame);
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao autalizar exame" });
        return
    }
}

export async function deleteExame(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        await prisma.exame.delete({ where: { id } });
        res.status(200).json({ message: "Exame deletado com sucesso" });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar exame" });
        return
    }
}

export async function lancarLaudo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { laudo } = req.body;

    try {
        const exame = await prisma.exame.update({
            where: { id },
            data: { laudo },
        });

        res.json({ message: "Laudo lançado com sucesso!", exame });
        return
    } catch (error) {
        console.error("Erro ao lançar laudo", error);
        res.status(500).json("Erro ao lançar laudo");
        return
    }
}

export async function updateLaudoExame(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { laudo } = req.body;

    try {
        const exame = await prisma.exame.update({
            where: { id },
            data: { laudo },
        });

        res.status(200).json(exame);
        return
    } catch (error) {
        res.status(500).json({ message: "Erro ao lançar laudo", error });
        return
    }
}