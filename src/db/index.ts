import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from './types';

export const pgPool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const kyselyDb = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: pgPool,
  }),
  plugins: [new CamelCasePlugin()],
});
