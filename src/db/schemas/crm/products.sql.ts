// Drizzle ORM schema for crm_products
import { decimal, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const products = crmSchema.table('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  sku: varchar('sku', { length: 64 }),
  price: decimal('price', { precision: 16, scale: 2 }),
  type: varchar('type', { length: 32 }),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
