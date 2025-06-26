import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';

export const createGlobalContext = (db: Kysely<DB>) => {
  return async ({ req, info, resHeaders }: FetchCreateContextFnOptions) => {
    return { req, info, resHeaders, db };
  };
};

export type GlobalContext = ReturnType<typeof createGlobalContext>;
