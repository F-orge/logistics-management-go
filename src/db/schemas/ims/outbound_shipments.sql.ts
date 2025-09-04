// Drizzle ORM schema for ims_outbound_shipments
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const outboundShipments = imsSchema.table('outbound_shipments', {
  id: uuid('id').primaryKey().defaultRandom(),
  sales_order_id: uuid('sales_order_id').notNull(), // FK to ims_sales_orders
  warehouse_id: uuid('warehouse_id').notNull(), // FK to ims_warehouses
  status: varchar('status', { length: 32 }).notNull(), // e.g., picking, packed, shipped
  tracking_number: varchar('tracking_number', { length: 64 }),
  carrier: varchar('carrier', { length: 64 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: sales_order_id -> ims_sales_orders.id, warehouse_id -> ims_warehouses.id
