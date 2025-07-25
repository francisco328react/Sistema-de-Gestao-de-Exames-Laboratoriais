import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export async function gerarLaudoPDF(dados: {
    paciente: string,
    exame: string,
    resultado: string,
}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = `
        <html>
            <head>
                <style>
                body { font-family: Arial; padding: 20px; }
                h1 { color: #333; }
                .info { margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1>Laudo Médico</h1>
                <div class="info">
                <p><strong>Paciente:</strong> ${dados.paciente}</p>
                <p><strong>Exame:</strong> ${dados.exame}</p>
                <p><strong>Resultado:</strong> ${dados.resultado}</p>
                </div>
            </body>
        </html>
  `;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
}