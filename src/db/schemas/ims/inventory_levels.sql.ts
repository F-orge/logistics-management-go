// Drizzle ORM schema for ims_inventory_levels

import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';
import { imsProducts } from './products.sql';
import { warehouses } from '../wms/warehouse.sql';
import { inventoryBatches } from './inventory_batches.sql';
import { locations } from '../wms/locations.sql';

export const inventoryLevels = imsSchema.table('inventory_levels', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .notNull()
    .references(() => imsProducts.id), // FK to ims_products
  warehouseId: uuid('warehouse_id')
    .notNull()
    .references(() => warehouses.id), // FK to wms_warehouses
  locationId: uuid('location_id').references(() => locations.id), // FK to wms_locations (optional)
  batchId: uuid('batch_id').references(() => inventoryBatches.id), // FK to ims_inventory_batches (optional)
  quantityOnHand: integer('quantity_on_hand').notNull(),
  quantityCommitted: integer('quantity_committed').notNull(),
  quantityAvailable: integer('quantity_available').notNull(), // calculated: on_hand - committed
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, warehouse_id -> ims_warehouses.id, location_id -> ims_warehouse_locations.id, batch_id -> ims_inventory_batches.id
