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
import { authFactory } from '@/lib/auth';
import * as orpcRouter from '@/orpc';
import { BunStorageRepository } from './repositories/storage';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import nodemailer from 'nodemailer';
import { cors } from 'hono/cors';

type ServerFactory = {
  pool: Pool;
};

export type HonoVariables = {
  user: ReturnType<typeof authFactory>['$Infer']['Session']['user'] | null;
  session:
    | ReturnType<typeof authFactory>['$Infer']['Session']['session']
    | null;
  db: Kysely<DB>;
  storage: BunStorageRepository;
  mailer: ReturnType<typeof nodemailer.createTransport>;
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

  // middlewares
  router.use(logger());
  router.use(prettyJSON());
  router.use(requestId());

  // mailer
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure:
      process.env.NODE_ENV === 'production'
        ? Boolean(process.env.MAIL_SECURE)
        : false, // true for 465, false for other ports
    auth:
      process.env.NODE_ENV === 'production'
        ? {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          }
        : undefined,
  });

  router.use('*', async (c, next) => {
    c.set('db', db);
    c.set(
      'storage',
      new BunStorageRepository(process.env.STORAGE_PAGE ?? '.data/files'),
    );
    c.set('mailer', transporter);
    return next();
  });

  // better auth
  const auth = authFactory(pool, transporter, true);

  router.use(
    '/api/auth/*', // or replace with "*" to enable cors for all routes
    cors({
      origin: 'http://localhost:3001', // replace with your origin
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
  );

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

  router.use('/api/orpc/*', async (c, next) => {
    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: '/api/orpc',
      context: {
        db: c.get('db'),
        user: c.get('user'),
        session: c.get('session'),
        storage: c.get('storage'),
        mailer: c.get('mailer'),
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
