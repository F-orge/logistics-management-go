import type { Insertable, Kysely } from "kysely";
import type { DB } from "../src/db/types";
import { faker } from "@faker-js/faker";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.insertInto("auth.users").values({
		email: "test@email.com",
		name: "test user",
		passwordHash: await Bun.password.hash("randompassword"),
	}).onConflict((oc) => oc.column("email").doNothing()).execute();

	const users: Insertable<DB["auth.users"]>[] = [];

	for (let i = 0; i < 100; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		users.push({
			email: faker.internet.email({ firstName, lastName }),
			name: `${firstName} ${lastName}`,
			passwordHash: await Bun.password.hash("randompassword"),
		});
	}

	await db.insertInto("auth.users").values(users).onConflict((oc) =>
		oc.column("email").doNothing()
	).execute();
}
