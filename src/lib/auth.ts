import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as betterAuthSchema from '../db/schemas/better-auth.sql';

export const authFactory = (dbClient: typeof db) =>
  betterAuth({
    database: drizzleAdapter(dbClient, {
      provider: 'pg',
      schema: {
        ...betterAuthSchema,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
  });

export const auth = authFactory(db);
