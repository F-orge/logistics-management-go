import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export const kyselyFactory = (pool: Pool) =>
  new Kysely({ dialect: new PostgresDialect({ pool }) });
