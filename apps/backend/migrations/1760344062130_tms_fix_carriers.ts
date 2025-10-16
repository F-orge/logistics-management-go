import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('tms').alterTable('carriers').dropColumn('contactDetails').execute()

  await db.schema
    .withSchema('tms')
    .alterTable('carriers')
    .addColumn('contactPerson', 'text')
    .addColumn('contactEmail', 'text')
    .addColumn('contactPhone', 'text')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('carriers')
    .dropColumn('contactPerson')
    .dropColumn('contactEmail')
    .dropColumn('contactPhone')
    .execute()

  await db.schema
    .withSchema('tms')
    .alterTable('carriers')
    .addColumn('contactDetails', 'text')
    .execute()
}
