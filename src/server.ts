import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { rpcRouter } from './rpc/router';
import { createGlobalContext } from './rpc/context';
import { db } from './rpc';

Bun.serve({
  hostname: '0.0.0.0',
  port: '8080',
  fetch: (request) =>
    fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: rpcRouter,
      createContext: createGlobalContext(db),
    }),
});
