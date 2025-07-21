import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function cadastrarPaciente(req: Request, res: Response): Promise<void> {
    console.log("Entrou na rota de cadastro");
    
    const { cpf, dataNasc, telefone, endereco } = req.body;
    console.log("Dados recebido:", {  cpf, dataNasc, telefone, endereco });

    const userId = req.user!.userId;
    console.log("ID do usuário autenticado:", userId);

    if(!cpf || !dataNasc || !telefone || !endereco) {
        console.log("Campos obrigatorios faltando");
        res.status(401).json({ error: "Preencha todos os campos obrigatorios" });
        return
    }

    try {
        const paciente = await prisma.paciente.create({
            data: {
                cpf,
                dataNasc: new Date(dataNasc),
                telefone,
                endereco,
                userId,
            },
        });

        if (!userId) {
            res.status(401).json({ error: "Usuário não autenticado" });
            return
        }

        console.log("Paciente cadastrado com sucesso", paciente);

        res.status(201).json(paciente);
        return
    } catch (error) {
        res.status(400).json({ error: "Erro ao cadastrar paciente" });
        return
    }
}