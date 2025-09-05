// Drizzle ORM schema for ims_sales_order_items
import { integer, timestamp, uuid } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const salesOrderItems = imsSchema.table('sales_order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  sales_order_id: uuid('sales_order_id').notNull(), // FK to ims_sales_orders
  product_id: uuid('product_id').notNull(), // FK to ims_products
  quantity_ordered: integer('quantity_ordered').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: sales_order_id -> ims_sales_orders.id, product_id -> ims_products.id
