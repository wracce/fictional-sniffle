import { queryDatabase } from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, res:NextResponse) {
    const query = 'SELECT * FROM Курирующие_учебное_заведение';

    try {
        const result = await queryDatabase(query);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error:any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}