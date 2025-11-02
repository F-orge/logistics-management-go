import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('tms').alterTable('geofences').dropColumn('coordinates').execute()

  await db.schema
    .withSchema('tms')
    .alterTable('geofences')
    .addColumn('longitude', 'real')
    .addColumn('latitude', 'real')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('geofences')
    .dropColumn('longitude')
    .dropColumn('latitude')
    .execute()

  await db.schema
    .withSchema('tms')
    .alterTable('geofences')
    .addColumn('coordinates', 'text')
    .execute()
}
