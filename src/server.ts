import { ORPCError, onError } from '@orpc/client';
import { RPCHandler } from '@orpc/server/fetch';
import { BatchHandlerPlugin } from '@orpc/server/plugins';
import sgMail from '@sendgrid/mail';
import { promises as fs } from 'fs';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import nodemailer from 'nodemailer';
import * as path from 'path';
import { Pool } from 'pg';
import { ZodError } from 'zod';
import type { DB } from '@/db/types';
import { authFactory } from '@/lib/auth';
import * as orpcRouter from '@/orpc';
import { BunStorageRepository } from './repositories/storage';

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
  mailer: ReturnType<typeof nodemailer.createTransport> | sgMail.MailService;
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
      migrationFolder: path.join(
        import.meta.dir,
        process.env.NODE_ENV === 'production' ? 'migrations' : '../migrations',
      ),
    }),
  });

  const migrationResult = await migrator.migrateToLatest();

  if (migrationResult.error) {
    throw migrationResult.error;
  }

  for (const migration of migrationResult.results || []) {
    console.info(
      migration.migrationName,
      migration.direction,
      migration.status,
    );
  }

  // middlewares
  router.use(logger());
  router.use(prettyJSON());
  router.use(requestId());

  // mail
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const localMailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
  });

  // dependency injection
  router.use('*', async (c, next) => {
    c.set('db', db);
    c.set(
      'storage',
      new BunStorageRepository(process.env.STORAGE_PATH ?? '.data/files'),
    );
    c.set('mailer', sgMail || localMailer);
    return next();
  });

  // better auth
  const auth = authFactory(
    pool,
    process.env.NODE_ENV === 'production' ? sgMail : localMailer,
    true,
  );

  // better auth cors settings
  router.use(
    '/api/auth/*',
    cors({
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.DOMAIN_ORIGIN!
          : 'http://localhost:3001', // replace with your origin
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

  // frontend mounting
  if (process.env.NODE_ENV === 'production') {
    router.get(
      '*',
      serveStatic({
        root: `${import.meta.dir}/frontend`,
        precompressed: true,
      }),
    );

    router.get(
      '*',
      serveStatic({
        root: `${import.meta.dir}/frontend`,
        path: 'index.html',
        precompressed: true,
      }),
    );
  }

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
  const handler = new RPCHandler(orpcRouter, {
    plugins: [new BatchHandlerPlugin()],
    interceptors: [
      onError((error) => {
        if (error instanceof ORPCError) {
          const zodError = error.cause as ZodError;
          console.error(zodError.issues);
        }
      }),
      onError((error) => {
        console.error(error);
      }),
    ],
  });

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
