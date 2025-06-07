import { Institution } from "@/models/institution";
import { queryDatabase } from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest, res:NextResponse) {
  const { название_курирующего_учебного_заведения, адрес_курирующего_учебного_заведения, фио_ректора, номер_курирующего_учебного_заведения } = await req.json() as Institution;
  const query = `UPDATE Курирующие_учебное_заведение SET название_курирующего_учебного_заведения = '${название_курирующего_учебного_заведения}', адрес_курирующего_учебного_заведения = '${адрес_курирующего_учебного_заведения}', фио_ректора = '${фио_ректора}' WHERE номер_курирующего_учебного_заведения = ${номер_курирующего_учебного_заведения}`

  try {
    await queryDatabase(query);
    return new Response(JSON.stringify({ message: 'Record created successfully' }), { status: 201 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}