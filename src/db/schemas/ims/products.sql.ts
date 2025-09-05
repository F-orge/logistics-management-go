// Drizzle ORM schema for ims_products
import {
  decimal,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { imsSchema } from './index';

export const products = imsSchema.table('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 64 }).notNull(),
  barcode: varchar('barcode', { length: 64 }), // e.g., UPC, EAN
  description: text('description'),
  cost_price: decimal('cost_price', { precision: 12, scale: 2 }),
  length: real('length'),
  width: real('width'),
  height: real('height'),
  weight: real('weight'),
  status: varchar('status', { length: 32 }).notNull(), // e.g., active, discontinued
  supplier_id: uuid('supplier_id'), // FK to ims_suppliers
  client_id: uuid('client_id'), // FK to companies (CRM)
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Foreign keys can be added in migration or with drizzle relations
// supplier_id -> ims_suppliers.id
// client_id -> companies.id (CRM)
