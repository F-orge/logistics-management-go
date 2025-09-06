import { RPCHandler } from '@orpc/server/fetch';
import { Hono } from 'hono';
import api from './api';
import { db } from './db';
import { auth, authFactory } from './lib/auth';

declare global {
  export type GlobalVariables = {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    request: Request;
    auth: typeof auth;
    db: typeof db;
  };
}

function createServer(dbClient: typeof db) {
  const betterAuth = authFactory(dbClient);

  const app = new Hono<{ Variables: GlobalVariables }>();

  const orpcHandler = new RPCHandler(api);

  // better auth integration
  app.use('*', async (c, next) => {
    const session = await betterAuth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }
    c.set('user', session.user);
    c.set('session', session.session);
    return next();
  });

  app.on(['POST', 'GET'], '/api/auth/*', (c) => betterAuth.handler(c.req.raw));

  // orpc integration
  app.use('/api/orpc/*', async (c, next) => {
    const { matched, response } = await orpcHandler.handle(c.req.raw, {
      prefix: '/api/orpc',
      context: {
        user: c.get('user'),
        session: c.get('session'),
        request: c.req.raw,
        auth: betterAuth,
        db: dbClient,
      },
    });

    if (matched) {
      return c.newResponse(response.body, response);
    }

    await next();
  });

  return app;
}

Bun.serve({
  port: '3001',
  fetch: createServer(db).fetch,
});
