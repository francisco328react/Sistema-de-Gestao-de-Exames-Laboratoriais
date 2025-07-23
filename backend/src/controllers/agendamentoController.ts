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

export async function getAllAgendamentos(req: Request, res: Response): Promise<void> {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            include: {
                paciente: true,
                exame: true,
                medico: true,
            },
        });

        res.json(agendamentos);
        return
    } catch (error) {
        console.error("Erro ao buscar agendamentos", error);
        res.status(500).json({ message: "Erro ao buscar agendamentos" });
        return
    }
}

export async function getAgendamentoById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const agendamento = await prisma.agendamento.findUnique({
            where: { id },
            include: {
                paciente: true,
                exame: true,
                medico: true
            },
        });

        if(!agendamento) {
            res.status(400).json({ message: "Agendamento não encontrado" });
            return
        }

        res.json(agendamento);
        return
    } catch (error) {
        console.error("Erro ao buscar agendamento", error);
        res.status(500).json({ message: "Erro ao buscar agendamento" });
        return
    }
}

export async function updateAgendamento(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { dataHora, pacienteId, exameId, medicoId } = req.body;

    try {
        const existeAgendamento = await prisma.agendamento.findFirst({
            where: {
                dataHora: new Date(dataHora),
                exameId,
                NOT: { id },
            },
        });

        if(existeAgendamento) {
            res.status(400).json({ message: "Novo horário indisponível" });
            return
        }

        const agendamento = await prisma.agendamento.update({
            where: { id },
            data: {
                dataHora: new Date(dataHora),
                pacienteId,
                exameId,
                medicoId,
            },
        });

        res.json(agendamento);
        return
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        res.status(500).json({ message: "Erro ao atualizar agendamento" });
        return
    }
}

export async function deleteAgendamento(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        await prisma.agendamento.delete({ where: { id } });

        res.json({ message: "Agendamento deletado com sucesso" });
        return
    } catch (error) {
        console.error("Erro ao deletar agendamento", error);
        res.status(500).json({ message: "Erro ao deletar agendamento" });
        return
    }
}