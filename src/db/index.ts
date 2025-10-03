import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import * as schema from '@/db/schemas';

export const db = drizzle(process.env.DATABASE_URL!, { logger: true });

export const seedFactory = (dbClient: typeof db) =>
  seed(dbClient, schema).refine((fake) => ({
    user: {
      columns: {
        id: fake.uuid(),
        name: fake.fullName(),
        email: fake.email(),
        emailVerified: fake.boolean(),
        role: fake.valuesFromArray({ values: ['admin', 'developer'] }),
        banned: fake.boolean(),
        banReason: fake.loremIpsum({ sentencesCount: 5 }),
        banExpires: fake.date({ minDate: new Date() }),
      },
      with: {
        account: 1,
      },
    },
    account: {
      columns: {
        id: fake.uuid(),
        accountId: fake.uuid(),
        providerId: fake.uuid(),
        accessToken: fake.string({ isUnique: true }),
        refreshToken: fake.string({ isUnique: true }),
        refreshTokenExpiresAt: fake.date({ minDate: new Date() }),
        accessTokenExpiresAt: fake.date({ minDate: new Date() }),
        password: fake.default({ defaultValue: 'password123' }),
      },
    },
    verification: {
      columns: {
        id: fake.uuid(),
        identifier: fake.valuesFromArray({
          values: ['email_verify', 'password_reset'],
        }),
        value: fake.string({ arraySize: 6 }),
      },
    },
    crmAttachments: {},
  }));
