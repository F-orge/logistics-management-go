import { betterAuth } from 'better-auth';
import { admin, bearer } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import { db } from '@/db';
import { Pool } from 'pg';

export const authFactory = (dbClient: typeof db) =>
  betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL! }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [bearer(), admin(), reactStartCookies()],
  });

export const auth = authFactory(db);
