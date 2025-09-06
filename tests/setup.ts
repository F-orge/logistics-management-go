import { afterAll, beforeAll } from 'bun:test';
import { sleep } from 'bun';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { db } from '@/db';
import { authFactory } from '@/lib/auth';

declare global {
  var dbClient: typeof db;
  var betterAuth: ReturnType<typeof authFactory>;
}

beforeAll(async () => {
  await Bun.$`docker compose -f test.compose.yaml up -d`;

  await sleep(5000);

  // drizzle client
  globalThis.dbClient = drizzle(
    'postgres://postgres:postgres@localhost:5432/postgres',
  );

  // better auth instance
  globalThis.betterAuth = authFactory(globalThis.dbClient);

  // read the sql files in drizzle folder
  const glob = new Bun.Glob('./drizzle/**/*.sql');

  const sqlFilePaths = await Array.fromAsync(glob.scan('.'));

  const sqlFilePromises: Promise<string>[] = [];

  for (const filePath of sqlFilePaths.sort()) {
    sqlFilePromises.push(Bun.file(filePath).text());
  }

  const sqlFiles = await Promise.all(sqlFilePromises);

  for (const sqlText of sqlFiles) {
    await globalThis.dbClient.execute(sqlText);
  }
});

afterAll(async () => Bun.$`docker compose -f test.compose.yaml down -v`);
