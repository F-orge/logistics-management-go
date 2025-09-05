// Drizzle ORM schema for billing_accounting_sync_log
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const accountingSyncLog = billingSchema.table('accounting_sync_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  recordId: uuid('record_id').notNull(), // e.g., invoice_id, payment_id
  recordType: varchar('record_type', { length: 32 }),
  externalSystem: varchar('external_system', { length: 32 }),
  externalId: varchar('external_id', { length: 64 }),
  status: varchar('status', { length: 32 }),
  errorMessage: text('error_message'),
  lastSyncAt: timestamp('last_sync_at', { withTimezone: true }),
});
