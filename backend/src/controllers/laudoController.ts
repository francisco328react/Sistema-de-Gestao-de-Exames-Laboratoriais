import { Request, Response } from "express";
import { gerarLaudoPDF } from "../services/pdfService";
import { prisma } from "../lib/prisma";

export async function downloadLaudo(req: Request, res: Response): Promise<void> {
    const { paciente, exame, resultado } = req.body;

    try {
        const pdfBuffer = await gerarLaudoPDF({ paciente, exame, resultado });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=laudo_${paciente}.pdf`,
        });

        res.send(pdfBuffer);
        return
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        res.status(500).json({ message: "Erro ao gerar PDF" });
        return
    }
}

export async function getLaudos(req: Request, res: Response): Promise<void> {
    try {
        const laudo = await prisma.laudo.findMany({
            include: {
                agendamento: {
                    include: {
                        paciente: true,
                        medico: true,
                        exame: true,
                    }
                }
            },
            orderBy: { criadoEm: "desc" }
        });

        res.json(laudo);
        return
    } catch (error) {
        console.error("Erro ao buscar laudo:", error);
        res.status(500).json("Erro ao buscar laudo");
        return
    }
}