import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (req: Request & { user?: { userId: string } }, res: Response, next: NextFunction ) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: "Token ausente" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token recebido -", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.user = { userId: decoded.userId };
        console.log("ID do ususario extraido do token", decoded.userId)

        next();
    } catch (error) {
        return res.status(401).json({ erroe: "Token Invalido" });
    }
}