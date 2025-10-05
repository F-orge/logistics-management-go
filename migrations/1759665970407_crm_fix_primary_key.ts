import { sql, type Kysely } from 'kysely';

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

		alter table crm.taggings
			drop constraint taggings_pkey;

		alter table crm.taggings
			add column id uuid not null default gen_random_uuid();

		alter table crm.taggings
			add constraint pk_taggings primary key (id);

		alter table crm.taggings
			add constraint unique_taggings unique (tag_id, record_id, record_type);
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

		-- Drop the unique constraint on (tag_id, record_id, record_type)
		alter table crm.taggings
			drop constraint unique_taggings;

		-- Drop the id column from taggings
		alter table crm.taggings
			drop column id;

		-- Restore the original composite primary key
		alter table crm.taggings
			add primary key (tag_id, record_id, record_type);
	`.execute(db);
}
