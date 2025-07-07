import { type Kysely, sql } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
	// auth schema
	await db.schema.createSchema("auth").execute();

	// auth.users

	await sql`create type auth.user_status as enum ('active','inactive')`.execute(
		db,
	);

	await db.schema
		.withSchema("auth")
		.createTable("users")
		.addColumn(
			"id",
			"uuid",
			(col) => col.notNull().primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(255)", (col) => col.notNull())
		.addColumn("email", "varchar(255)", (col) => col.notNull())
		.addColumn("password", "text", (col) => col.notNull())
		.addColumn(
			"email_verified",
			"boolean",
			(col) => col.notNull().defaultTo(false),
		)
		.addColumn("phone", "text")
		.addColumn(
			"status",
			sql`auth.user_status`,
			(col) => col.notNull().defaultTo("active"),
		)
		.addColumn("last_login", "timestamptz")
		.addColumn("deleted", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn(
			"created",
			"timestamptz",
			(col) => col.notNull().defaultTo(sql`now()`),
		)
		.addColumn(
			"updated",
			"timestamptz",
			(col) => col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("auth.users").execute();

	await sql`drop type auth.user_status`.execute(db);

	await db.schema.dropSchema("auth").execute();
}
