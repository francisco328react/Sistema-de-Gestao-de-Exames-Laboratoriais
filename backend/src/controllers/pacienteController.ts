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

export async function getPaciente(req: Request, res: Response): Promise<void> {
    try {
        console.log("Etrou na busca pelo paciente");

        if (!req.user || typeof req.user.userId !== 'string') {
            res.status(401).json({ error: "Usuário não autenticado" });
            return
        }

        const userId = req.user.userId;
        console.log("Buscando paciente do userId:", userId);

        const paciente = await prisma.paciente.findFirst({ 
            where: { userId },
        });

        if(!paciente) {
            res.status(404).json({ error: "Paciente não encontrado" });
            return
        }

        res.status(200).json(paciente);
    } catch (error) {
        console.error("Erro ao buscar paciente", error);
        res.status(500).json({ error: "Erro interno ao buscar paciente" });
        return
    }
}