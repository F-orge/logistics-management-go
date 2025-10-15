import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('crm').dropTable('taggings').cascade().execute();
  await db.schema.withSchema('crm').dropTable('tags').cascade().execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		-- Tags
		create table crm.tags(
			id uuid primary key default gen_random_uuid(),
			name varchar(100) not null unique,
			created_at timestamptz default now(),
			updated_at timestamptz default now()
		);

		comment on table crm.tags is 'Enables flexible categorization of records using custom labels.';

		comment on column crm.tags.id is 'Primary key';

		comment on column crm.tags.name is 'Label or tag name.';

		comment on column crm.tags.created_at is 'timestamptz when the tag was created.';

		comment on column crm.tags.updated_at is 'timestamptz when the tag was last updated.';

		-- Taggings
		create table crm.taggings(
			tag_id uuid not null references crm.tags(id),
			record_id uuid not null,
			record_type crm.record_type not null,
			primary key (tag_id, record_id, record_type)
		);

		comment on table crm.taggings is 'Associates tags with specific records, allowing for advanced filtering and organization.';

		comment on column crm.taggings.tag_id is 'Linked tag identifier.';

		comment on column crm.taggings.record_id is 'Identifier of the tagged record.';

		comment on column crm.taggings.record_type is 'Type of record associated with the tag.';

		create index idx_crm_taggings_record on crm.taggings(record_type, record_id);

		create index idx_crm_taggings_tag_id on crm.taggings(tag_id);
	`.execute(db);
}
