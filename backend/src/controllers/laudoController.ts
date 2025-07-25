import { Request, Response } from "express";
import { gerarLaudoPDF } from "../services/pdfService";

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