import { drizzle } from 'drizzle-orm/node-postgres';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as schema from '@/db/schemas';
import { DB } from './types';

export const db = drizzle(process.env.DATABASE_URL!, { logger: true });

export const kyselyDb = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL! }),
  }),
});
