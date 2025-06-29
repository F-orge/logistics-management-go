import { initTRPC, TRPCError } from '@trpc/server';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { Pool } from 'pg';
import type { GlobalContext } from './context';

const trpc = initTRPC.context<GlobalContext>().create();

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
});

export const router = trpc.router;

const generalProcedure = trpc.procedure;

export const publicProcedures = generalProcedure;

export const authenticatedProcedures = generalProcedure.use((opts) => {
  try {
    const authHeader = opts.ctx.req.headers.get('Authorization');

    if (!authHeader) throw new TRPCError({ code: 'FORBIDDEN' });

    const [format, token] = authHeader.split(' ');

    if (format.toLowerCase() !== 'bearer')
      throw new TRPCError({ code: 'FORBIDDEN' });

    const verified = jwt.verify(token, opts.ctx.jwtKey);

    if (typeof verified !== 'object' || verified === null) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return opts.next({
      ctx: {
        claims: verified as Required<JwtPayload>,
      },
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    if (e instanceof jwt.NotBeforeError) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    if (e instanceof jwt.TokenExpiredError) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    throw e;
  }
});
