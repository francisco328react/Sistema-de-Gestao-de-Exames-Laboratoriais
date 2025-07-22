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