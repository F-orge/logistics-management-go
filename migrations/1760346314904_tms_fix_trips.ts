import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('trips')
    .addColumn('endLocation', 'text')
    .addColumn('endTime', 'timestamptz')
    .addColumn('startLocation', 'text')
    .addColumn('startTime', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('trips')
    .dropColumn('endLocation')
    .dropColumn('endTime')
    .dropColumn('startLocation')
    .dropColumn('startTime')
    .execute();
}
