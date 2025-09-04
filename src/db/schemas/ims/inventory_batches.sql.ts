// Drizzle ORM schema for ims_inventory_batches
import { date, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { imsSchema } from './index';

export const inventoryBatches = imsSchema.table('inventory_batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').notNull(), // FK to ims_products
  batch_number: varchar('batch_number', { length: 64 }).notNull(),
  expiration_date: date('expiration_date'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign key: product_id -> ims_products.id
