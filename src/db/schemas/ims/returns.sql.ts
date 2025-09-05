// Drizzle ORM schema for ims_returns
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const returns = imsSchema.table('returns', {
  id: uuid('id').primaryKey().defaultRandom(),
  return_number: varchar('return_number', { length: 64 }).notNull(),
  sales_order_id: uuid('sales_order_id').notNull(), // FK to ims_sales_orders
  client_id: uuid('client_id').notNull(), // FK to companies (CRM)
  status: varchar('status', { length: 32 }).notNull(), // e.g., requested, approved, received
  reason: text('reason'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: sales_order_id -> ims_sales_orders.id, client_id -> companies.id
