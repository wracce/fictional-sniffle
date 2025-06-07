import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { queryDatabase } from "../../../../utils/connectToDatabase";
import * as path from 'path';
import * as fs from 'fs';
import fontkit from '@pdf-lib/fontkit';
import { Institution } from "@/models/institution";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const institutions = await queryDatabase(
      `SELECT * FROM Курирующие_учебное_заведение`
    );

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const fontBytes = fs.readFileSync(path.resolve('./public/Roboto-Regular.ttf'));
    const customFont = await pdfDoc.embedFont(fontBytes);
    
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    let y = height - fontSize * 2;

    // Header
    page.drawText('Согласие на обработку данных', {
      x: 50,
      y,
      size: fontSize*3,
      font: customFont,
    });

    y -= fontSize * 2.5;

    // Table headers
    page.drawText('ФИО куратора', {
      x: 50,
      y,
      size: fontSize*2,
      font: customFont,
    });
    page.drawText('Ваша подпись', {
      x: 250,
      y,
      size: fontSize*2,
      font: customFont,
    });
    page.drawText('Дата', {
      x: 450,
      y,
      size: fontSize*2,
      font: customFont,
    });

    y -= fontSize * 2;

    // Table content
    institutions.forEach((institution) => {
      page.drawText(institution.фио_ректора, {
        x: 50,
        y,
        size: fontSize,
        font: customFont,
      });
      page.drawLine({
        start: { x: 250, y: y + 3 },
        end: { x: 400, y: y + 3 },
        thickness: 1,
      });
      page.drawLine({
        start: { x: 450, y: y + 3 },
        end: { x: 550, y: y + 3 },
        thickness: 1,
      });
      y -= fontSize * 1.5;
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
      },
    });
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    // res.send(Buffer.from(pdfBytes));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
    return res.send({ error: "VN: " + error.message });
  }
}
