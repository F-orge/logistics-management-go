import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Kysely } from "kysely";
import type { DB } from "@/db/types";

export const createGlobalContext = (db: Kysely<DB>) => {
  return async ({ req, info, resHeaders }: FetchCreateContextFnOptions) => {
    return {
      req,
      info,
      resHeaders,
      db,
      jwtKey: process.env.JWT_SECRET_KEY ?? crypto.randomUUID(),
    };
  };
};

export type GlobalContext = ReturnType<typeof createGlobalContext>;
