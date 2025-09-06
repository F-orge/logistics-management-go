// Drizzle ORM schema for ims_inventory_adjustments
import { integer, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';
import { imsProducts } from './products.sql';
import { warehouses } from '../wms/warehouse.sql';
import { user } from '../better-auth.sql';

export const inventoryAdjustments = imsSchema.table('inventory_adjustments', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .references(() => imsProducts.id)
    .notNull(), // FK to ims_products
  warehouseId: uuid('warehouse_id')
    .references(() => warehouses.id)
    .notNull(), // FK to ims_warehouses
  userId: text('user_id')
    .references(() => user.id)
    .notNull(), // FK to users
  quantityChange: integer('quantity_change').notNull(),
  reason: varchar('reason', { length: 64 }).notNull(), // e.g., cycle_count, damaged_goods
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, warehouse_id -> ims_warehouses.id, user_id -> users.id
