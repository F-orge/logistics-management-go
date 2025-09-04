// Drizzle ORM schema for wms_packages
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const packages = wmsSchema.table('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  order_id: varchar('order_id', { length: 36 }).notNull(), // FK to ims_orders.id
  weight: integer('weight'), // grams
  length: integer('length'), // mm
  width: integer('width'), // mm
  height: integer('height'), // mm
  shipping_label_url: varchar('shipping_label_url', { length: 256 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign key: order_id -> ims_orders.id
