import { Institution } from "@/models/institution";
import { queryDatabase } from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    название_курирующего_учебного_заведения,
    адрес_курирующего_учебного_заведения,
    фио_ректора,
    номер_курирующего_учебного_заведения,
  } = (await req.json()) as Institution;
  const query = `INSERT INTO Курирующие_учебное_заведение (название_курирующего_учебного_заведения, адрес_курирующего_учебного_заведения, фио_ректора, номер_курирующего_учебного_заведения) VALUES ('${название_курирующего_учебного_заведения}', '${адрес_курирующего_учебного_заведения}', '${фио_ректора}', (SELECT ISNULL(MAX(номер_курирующего_учебного_заведения)+1,0) FROM Курирующие_учебное_заведение WITH(SERIALIZABLE, UPDLOCK)));`;
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
