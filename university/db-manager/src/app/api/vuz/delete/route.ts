import { Institution } from "@/models/institution";
import { queryDatabase } from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { номер } = await req.json();
  const query = `DELETE FROM Курирующие_учебное_заведение WHERE номер_курирующего_учебного_заведения = ${номер};`;
  console.log(query);

  try {
    await queryDatabase(query);
    return new Response(
      JSON.stringify({ message: "Record created successfully" }),
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
