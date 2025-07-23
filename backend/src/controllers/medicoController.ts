import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function cadastroMedico(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req.user as any)?.userId;
        const { name, crm, especialidade, telefone } = req.body;

        if(!name || !crm || !especialidade || !telefone) {
            res.status(400).json({ error: "Todos os campos são obrigatorios" });
            return
        }

        const medico = await prisma.medico.create({
            data: {
                name,
                crm,
                especialidade,
                telefone,
                user: {
                    connect: { id: userId }
                }
            },
        });

        res.status(200).json(medico);
    } catch (error) {
        console.error("Erro ao cadastrar médico:", error);
        res.status(500).json({ error: "Erro interno ao cadastrar médico" });
        return
    }
}

export async function getMedicos(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req.user as any)?.userId;

        if(!userId) {
            res.status(401).json({ error: "usuário não encontrado" });
            return
        }

        const { name, crm, especialidade, telefone } = req.body;

        const medico = await prisma.medico.findMany({
            where: {
                userId,
                name: name ? { contains: String(name), mode: 'insensitive' } : undefined,
                crm: crm ? String(crm) : undefined,
                especialidade: especialidade ? { contains: String(especialidade), mode: 'insensitive' } : undefined,
                telefone: telefone ? { contains: String(telefone), mode: 'insensitive' } : undefined,
            },
            orderBy: {
                name: 'asc'
            },
        });

        if(!medico.length) {
            res.status(404).json({ error: "Nenhum médico encontrado" });
            return;
        }

        res.status(200).json(medico);
        return
    } catch (error) {
        console.error("Erro ao buscar médicos:", error);
        res.status(500).json({ error: "Erro interno ao buscar médicos" });
        return
    }
}

export async function updateMedico(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { name, crm, especialidade, telefone } = req.body;

        const medicoExiste = await prisma.medico.findUnique({ where: { id } });

        if(!medicoExiste) {
            res.status(404).json({ error: "Médico não encontrado" });
            return
        }

        const medicoAtualziado = await prisma.medico.update({
            where: { id },
            data: {
                name,
                crm,
                especialidade,
                telefone
            },
        });

        res.status(200).json(medicoAtualziado);
    } catch (error) {
        console.error("Erro ao atualizar médico:", error);
        res.status(500).json({ error: "Erro interno ao atualizar médico" });
        return
    }
}

export async function deleteMedico(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        const medico = await prisma.medico.findUnique({ where: { id } });

        if(!medico) {
            res.status(404).json({ error: "Médico não encontrado" });
            return
        }

        await prisma.medico.delete({ where: { id } });

        res.status(200).json({ error: "Médico deletado com sucesso" });
        return
    } catch (error) {
        console.error("Erro ao deletar médico", error);
        res.status(500).json({ error: "Erro interno ao deletar médico" });
        return
    }
}