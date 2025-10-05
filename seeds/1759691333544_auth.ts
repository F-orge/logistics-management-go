import { authFactoryV2 } from '@/lib/auth';
import { base, de, de_AT, en, Faker } from '@faker-js/faker';
import type { Kysely } from 'kysely';
import { Pool } from 'pg';

// replace `any` with your database interface.
export async function seed(db: Kysely<any>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  const authClient = authFactoryV2(
    new Pool({ connectionString: process.env.DATABASE_URL }),
  );

  await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const [firstName, lastName] = [
        faker.person.firstName(),
        faker.person.lastName(),
      ];

      return authClient.api.signUpEmail({
        body: {
          email: faker.internet.email({ firstName, lastName }),
          name: `${firstName} ${lastName}`,
          password: 'password123',
          image: faker.image.avatarGitHub(),
        },
      });
    }),
  );
}
