// Drizzle ORM schema for ims_return_items
import { integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const returnItems = imsSchema.table('return_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  return_id: uuid('return_id').notNull(), // FK to ims_returns
  product_id: uuid('product_id').notNull(), // FK to ims_products
  quantity_expected: integer('quantity_expected').notNull(),
  quantity_received: integer('quantity_received').notNull(),
  condition: varchar('condition', { length: 32 }), // e.g., sellable, damaged
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
// Foreign keys: return_id -> ims_returns.id, product_id -> ims_products.id
