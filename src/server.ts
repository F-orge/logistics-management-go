import { RPCHandler } from '@orpc/server/fetch';
import { promises as fs } from 'fs';
import { Hono } from 'hono';
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import * as path from 'path';
import { Pool } from 'pg';
import { DB } from '@/db/types';
import { authFactoryV2 } from '@/lib/auth';
import orpcRouter from '@/orpc';

type ServerFactory = {
  pool: Pool;
};

export type HonoVariables = {
  user: ReturnType<typeof authFactoryV2>['$Infer']['Session']['user'] | null;
  session:
    | ReturnType<typeof authFactoryV2>['$Infer']['Session']['session']
    | null;
  db: Kysely<DB>;
};

export const serverFactory = async ({ pool }: ServerFactory) => {
  const router = new Hono<{ Variables: HonoVariables }>();

  // kysely
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({ pool }),
    plugins: [new CamelCasePlugin()],
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  });

  await migrator.migrateToLatest();

  router.use('*', async (c, next) => {
    c.set('db', db);
    return next();
  });

  // better auth
  const auth = authFactoryV2(pool);

  router.on(['POST', 'GET'], '/api/auth/*', (c) => {
    return auth.handler(c.req.raw);
  });

  router.use('*', async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }
    c.set('user', session.user);
    c.set('session', session.session);
    return next();
  });

  // orpc
  const handler = new RPCHandler(orpcRouter);

  router.use('/api/rpc/*', async (c, next) => {
    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: '/api/rpc',
      context: {
        db: c.get('db'),
        user: c.get('user'),
        session: c.get('session'),
      },
    });

    if (matched) {
      return c.newResponse(response.body, response);
    }

    return next();
  });

  return router;
};

export default {
  fetch: (
    await serverFactory({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    })
  ).fetch,
};
