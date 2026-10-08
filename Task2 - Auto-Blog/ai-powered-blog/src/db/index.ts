import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// We ensure DATABASE_URL is available through the Zod env validation (T011)
// If it fails, the app won't start. For now, we use process.env directly.
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
