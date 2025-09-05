// Drizzle ORM schema for ims_sales_orders
import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const salesOrders = imsSchema.table('sales_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  order_number: varchar('order_number', { length: 64 }).notNull(),
  client_id: uuid('client_id').notNull(), // FK to companies (CRM)
  crm_opportunity_id: uuid('crm_opportunity_id'), // FK to CRM opportunities
  status: varchar('status', { length: 32 }).notNull(), // e.g., pending, completed
  shipping_address: text('shipping_address').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: client_id -> companies.id, crm_opportunity_id -> crm_opportunities.id
