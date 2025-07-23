import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createAgendamento(req: Request, res: Response): Promise<void> {
    const { dataHora, pacienteId, exameId, medicoId } = req.body;

    try {
        const exiateAgendamento = await prisma.agendamento.findFirst({
            where: {
                dataHora: new Date(dataHora),
                exameId,
            },
        });

        if(exiateAgendamento) {
            res.status(400).json({ message: "Horário indisponível para esse exame" });
            return
        }

        const agendamento = await prisma.agendamento.create({
            data: {
                dataHora: new Date(dataHora),
                pacienteId,
                exameId,
                medicoId,
            },
            include: {
                paciente: true,
                exame: true,
                medico: true,
            },
        });

        res.status(201).json(agendamento);
        return
    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        res.status(500).json({ message: "Erro ao agendar exame" });
        return
    }
}