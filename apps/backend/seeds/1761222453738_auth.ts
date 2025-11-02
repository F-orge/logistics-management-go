import type { Insertable, Kysely } from "kysely";
import { hashPassword } from "better-auth/crypto";
import { DB, User, UserRole } from "@packages/graphql/db.types";
import { Faker, en } from "@faker-js/faker";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: en });

  const passwordHash = await hashPassword("admin123");

  const userSeeder = (faker: Faker): Insertable<User> => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    emailVerified: true,
    name: faker.person.fullName(),
    role: faker.helpers.enumValue(UserRole),
    image: faker.image.avatar(),
  });

  const fakeUsers: Insertable<User>[] = Array.from({ length: 1000 }, () =>
    userSeeder(faker)
  );

  const users = await db
    .insertInto("user")
    .values(fakeUsers)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  const adminUser: Insertable<User> = {
    id: faker.string.uuid(),
    email: "admin@example.com",
    emailVerified: true,
    name: "Admin User",
    role: UserRole.Admin,
    image: faker.image.avatar(),
  };

  const admin = await db
    .insertInto("user")
    .values(adminUser)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .executeTakeFirst();

  if (admin) users.push(admin);

  const accountSeeder = (
    faker: Faker,
    userId: string
  ): Insertable<DB["account"]> => ({
    id: faker.string.uuid(),
    userId,
    providerId: "email",
    accountId: userId,
    updatedAt: new Date(),
    password: passwordHash,
  });

  const fakeAccounts: Insertable<DB["account"]>[] = users.map((user) =>
    accountSeeder(faker, user.id)
  );

  await db
    .insertInto("account")
    .values(fakeAccounts)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();
}
