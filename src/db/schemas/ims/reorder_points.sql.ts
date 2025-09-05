// Drizzle ORM schema for ims_reorder_points
import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const reorderPoints = imsSchema.table('reorder_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').notNull(), // FK to ims_products
  warehouse_id: uuid('warehouse_id').notNull(), // FK to ims_warehouses
  threshold: integer('threshold').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, warehouse_id -> ims_warehouses.id
