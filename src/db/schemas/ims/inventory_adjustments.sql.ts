// Drizzle ORM schema for ims_inventory_adjustments
import { integer, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const inventoryAdjustments = imsSchema.table('inventory_adjustments', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').notNull(), // FK to ims_products
  warehouse_id: uuid('warehouse_id').notNull(), // FK to ims_warehouses
  user_id: uuid('user_id').notNull(), // FK to users
  quantity_change: integer('quantity_change').notNull(),
  reason: varchar('reason', { length: 64 }).notNull(), // e.g., cycle_count, damaged_goods
  notes: text('notes'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, warehouse_id -> ims_warehouses.id, user_id -> users.id
