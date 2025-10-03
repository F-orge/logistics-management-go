import { index, integer, numeric, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmInvoices } from './invoices';
import { crmProducts } from './products';
import { crmSchema } from './schema';

export const crmInvoiceItems = crmSchema.table(
  'invoice_items',
  {
    ...entityFields,
    invoiceId: uuid('invoice_id')
      .notNull()
      .references(() => crmInvoices.id),
    productId: uuid('product_id')
      .notNull()
      .references(() => crmProducts.id),
    quantity: integer('quantity').notNull(),
    price: numeric('price', { precision: 15, scale: 2 }).notNull(),
  },
  (table) => [
    index('idx_crm_invoice_items_invoice_id').on(table.invoiceId),
    index('idx_crm_invoice_items_product_id').on(table.productId),
  ],
);

// zod schemas
export const insertInvoiceItemSchema =
  createInsertSchema(crmInvoiceItems).omit(omitEntity);

export const updateInvoiceItemSchema = insertInvoiceItemSchema.partial();
