import { betterAuth } from 'better-auth';
import { admin, bearer } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import { Pool } from 'pg';
import { db } from '@/db';

export const authFactory = (dbClient: typeof db) =>
  betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL! }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [bearer(), admin(), reactStartCookies()],
  });

export const authFactoryV2 = (dbClient: Pool) =>
  betterAuth({
    database: dbClient,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [bearer(), admin(), reactStartCookies()],
  });

export const auth = authFactory(db);
