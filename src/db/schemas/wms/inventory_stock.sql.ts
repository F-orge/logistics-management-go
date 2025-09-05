// Drizzle ORM schema for wms_inventory_stock
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const inventoryStock = wmsSchema.table('inventory_stock', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: varchar('product_id', { length: 36 }).notNull(), // FK to ims_products.id
  location_id: uuid('location_id').notNull(), // FK to wms_locations.id
  quantity: integer('quantity').notNull(),
  status: varchar('status', { length: 32 }).notNull(), // available, allocated, quarantined
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: product_id -> ims_products.id, location_id -> wms_locations.id
