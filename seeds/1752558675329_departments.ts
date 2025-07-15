import type { Insertable, Kysely, Updateable } from "kysely";
import { DB } from "../src/db/types";
import { faker } from "@faker-js/faker";

export async function seed(db: Kysely<DB>): Promise<void> {
	const users = await db.selectFrom("auth.users").select("id").where(
		"email",
		"!=",
		"test@email.com",
	).execute();

	const newDepartments: Insertable<DB["org.departments"]>[] = [];

	for (let i = 0; i < 100; i++) {
		newDepartments.push({
			name: faker.company.name(),
			code: faker.finance.accountNumber(12),
			departmentType: faker.helpers.arrayElement([
				"finance",
				"human-resource",
				"warehouse",
				"internal",
			]),
			managerId: faker.helpers.arrayElement(users).id,
			email: faker.internet.email(),
		});
	}

	const departments = await db.insertInto("org.departments").values(
		newDepartments,
	)
		.onConflict(
			(oc) => oc.column("name").doNothing(),
		)
		.onConflict(
			(oc) => oc.column("code").doNothing(),
		).returning("id").execute();

	const updatePromises: Promise<{ id: string } | undefined>[] = [];

	for (const user of users) {
		const updatePromise = db.updateTable("auth.users").set({
			departmentId: faker.helpers.arrayElement(departments).id,
		})
			.where("id", "=", user.id).returning("id").executeTakeFirst();

		updatePromises.push(updatePromise);
	}

	await Promise.all(updatePromises);

	const newDepartmentTransportModes: Insertable<
		DB["org.departmentTransportModes"]
	>[] = [];

	for (let i = 0; i < 100; i++) {
		newDepartmentTransportModes.push({
			departmentId: faker.helpers.arrayElement(departments).id,
			transportMode: faker.helpers.arrayElement(["air", "sea", "trucking"]),
			isPrimary: faker.helpers.arrayElement([true, false]),
		});
	}

	await db.insertInto("org.departmentTransportModes").values(
		newDepartmentTransportModes,
	).execute();
}
