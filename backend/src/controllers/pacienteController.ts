import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function cadastrarPaciente(req: Request, res: Response): Promise<void> {
    console.log("Entrou na rota de cadastro");
    
    const { cpf, dataNasc, telefone, endereco, name } = req.body;
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
                name,
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
        //console.log("Entrou na busca pelo paciente");

        const userId = (req.user as any)?.userId;

        if (!req.user || typeof req.user.userId !== 'string') {
            res.status(401).json({ error: "Usuário não autenticado" });
            return
        }
        
        const { name, cpf, telefone, dataNasc, dataInicio, dataFim, endereco, orderByName } = req.query;
        //console.log("Buscando paciente do userId:", userId);

        let dataNascFiltro: any = undefined;

        if(dataNasc) {
            dataNascFiltro = new Date(dataNasc as string);
        }else if(dataInicio && dataFim) {
            dataNascFiltro = {
                gte: new Date(dataInicio as string),
                lte: new Date(dataFim as string),
            };
        }

        let orderBy: any = { createdAt: 'desc' };

        if(orderByName === 'asc' || orderByName === 'desc') {
            orderBy = { name: orderByName };
        }

        const paciente = await prisma.paciente.findMany({ 
            where: { 
                userId,
                name: name ? { contains: String(name), mode: 'insensitive' } : undefined,
                cpf: cpf ? String(cpf) : undefined,
                telefone: telefone ? { contains: String(telefone), mode: 'insensitive' } : undefined,
                endereco: endereco ? { contains: String(endereco), mode: 'insensitive' } : undefined,
                dataNasc: dataNascFiltro,
            },
            orderBy
        });

        //console.log("Paciente encontrado:", paciente);

        if(!paciente || paciente.length === 0) {
            res.status(404).json({ error: "Paciente(s) não encontrado(s)" });
            return
        }

        res.status(200).json(paciente);
    } catch (error) {
        console.error("Erro ao buscar paciente", error);
        res.status(500).json({ error: "Erro interno ao buscar paciente" });
        return
    }
}

export async function atualizarPaciente(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const userId = (req.user as any)?.userId;
        const { name, cpf, dataNasc, telefone, endereco } = req.body;

        const pacienteExiste = await prisma.paciente.findUnique({ where: { id } });

        if(!pacienteExiste || pacienteExiste.userId !== userId) {
            res.status(404).json({ error: "Paciente não encontrado ou não autorizado" });
            return
        }

        const pacienteAtualizado = await prisma.paciente.update({
            where: { id },
            data: {
                name,
                cpf,
                dataNasc: dataNasc ? new Date(dataNasc) : undefined,
                telefone,
                endereco,
            },
        });

        res.status(200).json(pacienteAtualizado);
    } catch (error) {
        console.error("Erro ao autalizar paciente:", error);
        res.status(500).json({ error: "Erro interno ao autalizar paciente" });
        return
    }
}

export async function deletarPaciente(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const userId = (req.user as any)?.userId;

        const paciente = await prisma.paciente.findUnique({ where: { id } });

        if(!paciente || paciente.userId !== userId) {
            res.status(404).json({ error: "Paciente não encontrado ou não autorizado" });
            return
        }

        await prisma.paciente.delete({ where: { id } });

        res.status(200).json({ error: "Paciente deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar paciente:", error);
        res.status(500).json({ error: "Erro interno ao deletar paciente" });
        return
    }
}