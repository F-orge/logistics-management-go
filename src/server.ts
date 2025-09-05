import { RPCHandler } from '@orpc/server/fetch';
import { Hono } from 'hono';
import api from './api';
import { auth } from './lib/auth';

export type GlobalVariables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
  request: Request;
  auth: typeof auth;
};

function createServer(authClient: typeof auth) {
  const app = new Hono<{ Variables: GlobalVariables }>();

  const orpcHandler = new RPCHandler(api);

  // better auth integration
  app.use('*', async (c, next) => {
    const session = await authClient.api.getSession({
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

  app.on(['POST', 'GET'], '/api/auth/*', (c) => authClient.handler(c.req.raw));

  // orpc integration
  app.use('/api/orpc/*', async (c, next) => {
    const { matched, response } = await orpcHandler.handle(c.req.raw, {
      context: {
        user: c.get('user'),
        session: c.get('session'),
        request: c.req.raw,
        auth,
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
  fetch: createServer(auth).fetch,
});
