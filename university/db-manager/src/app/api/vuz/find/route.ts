import { queryDatabase } from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    const {фио} = await req.json();
    const query = ` SELECT * FROM Курирующие_учебное_заведение WHERE фио_ректора LIKE '%${фио}%';`;
    console.log(query);
    
    try {
        const result = await queryDatabase(query);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error:any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
