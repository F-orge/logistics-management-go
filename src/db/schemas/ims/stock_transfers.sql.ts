// Drizzle ORM schema for ims_stock_transfers
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const stock_transfers = imsSchema.table('stock_transfers', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').notNull(), // FK to ims_products
  source_warehouse_id: uuid('source_warehouse_id').notNull(), // FK to ims_warehouses
  destination_warehouse_id: uuid('destination_warehouse_id').notNull(), // FK to ims_warehouses
  quantity: integer('quantity').notNull(),
  status: varchar('status', { length: 32 }).notNull(), // e.g., in_transit, received
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, source_warehouse_id -> ims_warehouses.id, destination_warehouse_id -> ims_warehouses.id
