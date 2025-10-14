import { kyselyFactory } from '@packages/db';
import { Hono } from 'hono';
import { Pool } from 'pg';
import type { ConfigInterface } from './config';

interface HonoVariables {
  kysely: ReturnType<typeof kyselyFactory>;
}

export const serverFactory = (config: ConfigInterface) => {
  const router = new Hono<{ Variables: HonoVariables }>();

  const kysely = kyselyFactory(
    new Pool({ connectionString: config.databaseUrl }),
  );

  // db
  router.use('*', (c, next) => {
    c.set('kysely', kysely);

    return next();
  });

  return router;
};

export default {
  fetch: serverFactory({
    databaseUrl: process.env.DATABASE_URL ?? '',
  }).fetch,
};
