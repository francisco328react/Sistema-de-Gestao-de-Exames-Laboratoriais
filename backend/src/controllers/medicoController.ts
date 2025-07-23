import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { error } from "console";

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