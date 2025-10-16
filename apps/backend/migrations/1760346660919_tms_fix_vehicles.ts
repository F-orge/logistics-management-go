import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('vehicles')
    .addColumn('make', 'text')
    .addColumn('year', 'int4')
    .addColumn('vin', 'text')
    .addColumn('currentMileage', 'int4')
    .addColumn('lastMaintenanceDate', 'date')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('vehicles')
    .dropColumn('make')
    .dropColumn('year')
    .dropColumn('vin')
    .dropColumn('currentMileage')
    .dropColumn('lastMaintenanceDate')
    .execute()
}
