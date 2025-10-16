import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('drivers')
    .addColumn('contactPhone', 'text')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('tms').alterTable('drivers').dropColumn('contactPhone').execute()
}
