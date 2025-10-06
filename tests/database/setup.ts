import { afterAll, beforeAll } from 'bun:test';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import { DB } from '@/db/types';

declare global {
  // eslint-disable-next-line no-var
  var kyselyDb: Kysely<DB>;
}

beforeAll(async () => {
  globalThis.kyselyDb = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  const migrator = new Migrator({
    db: kyselyDb,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), 'migrations'),
    }),
    allowUnorderedMigrations: true,
  });

  migrator.migrateToLatest();
});

afterAll(async () => {
  globalThis.kyselyDb.destroy();
});
