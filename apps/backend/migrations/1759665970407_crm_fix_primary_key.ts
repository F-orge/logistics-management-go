import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Add up migration script here
		alter table crm.opportunity_products
			drop constraint opportunity_products_pkey;

		-- Add the new id column
		alter table crm.opportunity_products
			add column id uuid not null default gen_random_uuid();

		-- Add a new primary key on the id column
		alter table crm.opportunity_products
			add constraint pk_opportunity_products primary key (id);

		alter table crm.opportunity_products
			add constraint unique_opportunity_products unique (opportunity_id, product_id);
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		-- Drop the unique constraint on (opportunity_id, product_id)
		alter table crm.opportunity_products
			drop constraint unique_opportunity_products;

		-- Drop the new primary key on id
		alter table crm.opportunity_products
			drop constraint pk_opportunity_products;

		-- Drop the id column
		alter table crm.opportunity_products
			drop column id;

		-- Restore the original composite primary key
		alter table crm.opportunity_products
			add primary key (opportunity_id, product_id);
	`.execute(db);
}
