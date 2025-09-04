// Drizzle ORM schema for billing_invoice_line_items
import { uuid, varchar, decimal, integer } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const invoiceLineItems = billingSchema.table('invoice_line_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').notNull(), // FK to invoices
  sourceRecordId: uuid('source_record_id'), // e.g., shipment_id, storage_period_id
  sourceRecordType: varchar('source_record_type', { length: 32 }),
  description: varchar('description', { length: 256 }),
  quantity: integer('quantity'),
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }),
  totalPrice: decimal('total_price', { precision: 12, scale: 2 }),
});
