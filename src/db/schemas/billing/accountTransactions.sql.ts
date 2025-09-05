// Drizzle ORM schema for billing_account_transactions
import { uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const accountTransactions = billingSchema.table('account_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientAccountId: uuid('client_account_id').notNull(), // FK to client_accounts
  type: varchar('type', { length: 32 }).notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  sourceRecordId: uuid('source_record_id'), // e.g., invoice_id, payment_id
  sourceRecordType: varchar('source_record_type', { length: 32 }),
  transactionDate: timestamp('transaction_date', {
    withTimezone: true,
  }).notNull(),
});
