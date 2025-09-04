// Drizzle ORM schema for crm_invoice_items
import { decimal, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const invoiceItems = crmSchema.table('invoice_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id'), // FK to invoices
  productId: uuid('product_id'), // FK to products
  quantity: integer('quantity'),
  price: decimal('price', { precision: 16, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
