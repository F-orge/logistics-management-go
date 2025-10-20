import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		create view "crm"."products_view" as select products.* from "crm"."products" products;
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		-- sql code here
	`.execute(db);
}
