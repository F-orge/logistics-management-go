import { afterAll, beforeAll } from 'bun:test';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { sleep } from 'bun';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Wait } from 'testcontainers';
import type { db } from '@/db';
import { authFactory } from '@/lib/auth';

declare global {
  var container: StartedPostgreSqlContainer;
  var dbClient: typeof db;
  var betterAuth: ReturnType<typeof authFactory>;
}

beforeAll(async () => {
  // postgres test container
  globalThis.container = await new PostgreSqlContainer(
    'postgres:17.2-alpine3.20',
  )
    .withWaitStrategy(
      Wait.forLogMessage('database system is ready to accept connections', 1),
    )
    .start();

  // sleep for 1 second to sync up with test container
  await sleep(1000);

  // drizzle client
  globalThis.dbClient = drizzle(globalThis.container.getConnectionUri());

  // better auth instance
  globalThis.betterAuth = authFactory(globalThis.dbClient);

  // read the sql files in drizzle folder
  const glob = new Bun.Glob('./drizzle/**/*.sql');

  const sqlFilePromises: Promise<string>[] = [];

  for await (const data of glob.scan('.')) {
    sqlFilePromises.push(Bun.file(data).text());
  }

  const sqlFiles = (await Promise.all(sqlFilePromises)).sort();

  for (const sqlText of sqlFiles) {
    await globalThis.dbClient.execute(sqlText);
  }
});

afterAll(async () => globalThis.container.stop());
