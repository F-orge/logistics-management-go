import { initTRPC } from '@trpc/server';
import { Pool } from 'pg';
import type { GlobalContext } from './context';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from 'kysely-codegen';

const trpc = initTRPC.context<GlobalContext>().create();

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
});

export const router = trpc.router;

export const publicProcedures = trpc.procedure.use((opts) => {
  return opts.next();
});

export const authenticatedProcedures = trpc.procedure;
