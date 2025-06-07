import { queryDatabase } from "@/utils/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // try {
  //   const result = await queryDatabase(
  //     `SELECT * FROM Курирующие_учебное_заведение`
  //   );
  //   res.status(200).json(result);
  // } catch (error: any) {
  //   res.status(500).json({ error: error.message });
  // }
  // case "POST":
  //   try {
  //     const { название, адрес, фиоРектора, номер } = req.body;
  //     await queryDatabase(
  //       `INSERT INTO Курирующие_учебное_заведение (название_курирующего_учебного_заведения, адрес_курирующего_учебного_заведения, фио_ректора, номер_курирующего_учебного_заведения) VALUES (${название}, ${адрес}, ${фиоРектора}, ${номер})`
  //     );
  //     res.status(201).json({ message: "Record created successfully" });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  //   break;

  // case "PUT":
  //   try {
  //     const { название, адрес, фиоРектора, номер } = req.body;
  //     await queryDatabase(
  //       `UPDATE Курирующие_учебное_заведение SET название_курирующего_учебного_заведения = ${название}, адрес_курирующего_учебного_заведения = ${адрес}, фио_ректора = ${фиоРектора} WHERE номер_курирующего_учебного_заведения = ${номер}`,
  //     );
  //     res.status(200).json({ message: "Record updated successfully" });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  //   break;

  // case "DELETE":
  //   try {
  //     const { номер } = req.body;
  //     await queryDatabase(
  //       "DELETE FROM Курирующие_учебное_заведение WHERE номер_курирующего_учебного_заведения = ?",
  //       [номер]
  //     );
  //     res.status(200).json({ message: "Record deleted successfully" });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  //   break;

  //   default:
  //     res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  //     res.status(405).end(`Method ${method} Not Allowed`);
  // }
}
