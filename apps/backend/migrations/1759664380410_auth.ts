import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		create table if not exists "user"(
			"id" text not null primary key,
			"name" text not null,
			"email" text not null unique,
			"email_verified" boolean not null,
			"image" text,
			"created_at" timestamptz default current_timestamp not null,
			"updated_at" timestamptz default current_timestamp not null,
			"role" text,
			"banned" boolean,
			"ban_reason" text,
			"ban_expires" timestamptz
		);

		create table if not exists "session"(
			"id" text not null primary key,
			"expires_at" timestamptz not null,
			"token" text not null unique,
			"created_at" timestamptz default current_timestamp not null,
			"updated_at" timestamptz not null,
			"ip_address" text,
			"user_agent" text,
			"user_id" text not null references "user"("id") on delete cascade,
			"impersonated_by" text
		);

		create table if not exists "account"(
			"id" text not null primary key,
			"account_id" text not null,
			"provider_id" text not null,
			"user_id" text not null references "user"("id") on delete cascade,
			"access_token" text,
			"refresh_token" text,
			"id_token" text,
			"access_token_expires_at" timestamptz,
			"refresh_token_expires_at" timestamptz,
			"scope" text,
			"password" text,
			"created_at" timestamptz default current_timestamp not null,
			"updated_at" timestamptz not null
		);

		create table if not exists "verification"(
			"id" text not null primary key,
			"identifier" text not null,
			"value" text not null,
			"expires_at" timestamptz not null,
			"created_at" timestamptz default current_timestamp not null,
			"updated_at" timestamptz default current_timestamp not null
		);
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		drop table if exists "verification";

		drop table if exists "account";

		drop table if exists "session";

		drop table if exists "user";
	`.execute(db);
}
