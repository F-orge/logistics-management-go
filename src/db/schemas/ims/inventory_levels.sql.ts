// Drizzle ORM schema for ims_inventory_levels

import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const inventoryLevels = imsSchema.table('inventory_levels', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').notNull(), // FK to ims_products
  warehouse_id: uuid('warehouse_id').notNull(), // FK to ims_warehouses
  location_id: uuid('location_id'), // FK to ims_warehouse_locations (optional)
  batch_id: uuid('batch_id'), // FK to ims_inventory_batches (optional)
  quantity_on_hand: integer('quantity_on_hand').notNull(),
  quantity_committed: integer('quantity_committed').notNull(),
  quantity_available: integer('quantity_available').notNull(), // calculated: on_hand - committed
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, warehouse_id -> ims_warehouses.id, location_id -> ims_warehouse_locations.id, batch_id -> ims_inventory_batches.id
