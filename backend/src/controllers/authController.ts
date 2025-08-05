import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma";

const primsa = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function register(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await primsa.user.create({
            data: { 
                name, 
                email, 
                password: hashedPassword, 
                role 
            },
        });

        res.status(201).json({
            user: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(400).json({ error: "Erro ao registrar usuário. "});
        return
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await primsa.user.findUnique({ where: { email } });

    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return
    }

    const token = jwt.sign({ userId: user?.id, role: user?.role }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.json({ token });
    return
}
