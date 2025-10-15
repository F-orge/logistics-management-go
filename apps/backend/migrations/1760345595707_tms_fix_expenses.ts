import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('expenses')
    .addColumn('description', 'text')
    .addColumn('expenseDate', 'date')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('tms')
    .alterTable('expenses')
    .dropColumn('description')
    .dropColumn('expenseDate')
    .execute();
}
