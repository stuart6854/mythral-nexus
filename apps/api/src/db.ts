import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const url = process.env.DATABASE_URL!;
export const client = postgres(url, { max: 10 });
export const db = drizzle(client);
