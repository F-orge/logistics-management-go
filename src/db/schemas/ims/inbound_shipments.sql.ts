// Drizzle ORM schema for ims_inbound_shipments
import { date, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const inboundShipments = imsSchema.table('inbound_shipments', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_id: uuid('client_id').notNull(), // FK to companies (CRM)
  warehouse_id: uuid('warehouse_id').notNull(), // FK to ims_warehouses
  status: varchar('status', { length: 32 }).notNull(), // e.g., pending, arrived, completed
  expected_arrival_date: date('expected_arrival_date'),
  actual_arrival_date: date('actual_arrival_date'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: client_id -> companies.id, warehouse_id -> ims_warehouses.id
