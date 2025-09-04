// Drizzle ORM schema for billing_disputes
import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const disputes = billingSchema.table('disputes', {
  id: uuid('id').primaryKey().defaultRandom(),
  lineItemId: uuid('line_item_id').notNull(), // FK to invoice_line_items
  clientId: uuid('client_id').notNull(), // FK to crm_companies
  reason: text('reason'),
  status: varchar('status', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
