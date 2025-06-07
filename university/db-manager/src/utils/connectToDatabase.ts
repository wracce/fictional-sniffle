// lib/db.ts
import { DB_CONFIG } from "@/configs/db-config";
import sql, { ConnectionPool } from "mssql";

let pool: ConnectionPool;

async function connectToDatabase(): Promise<ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(DB_CONFIG);
  }
  return pool;
}

async function queryDatabase(
  query: string,
): Promise<any> {
  try {
    await connectToDatabase();

    const result = await pool.query(query);
    return result.recordset; // Возвращаем результат запроса
  } catch (error:any) {
    throw new Error(`Error querying database: ${error.message}`);
  } finally {
    await pool.close(); // Закрываем соединение с базой данных
  }
}

export { queryDatabase };
