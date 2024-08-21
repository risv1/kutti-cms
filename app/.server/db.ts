import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const client = postgres(process.env.DB_URL!);
export const db = drizzle(client);
