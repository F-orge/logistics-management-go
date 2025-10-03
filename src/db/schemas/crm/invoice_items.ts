import { index, integer, numeric, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmInvoices } from './invoices';
import { crmProducts } from './products';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';

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

// server actions
export const createInvoiceItemAction = serverAction({ method: 'POST' })
  .inputValidator(insertInvoiceItemSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmInvoiceItems)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateInvoiceItemAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateInvoiceItemSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmInvoiceItems)
        .set(data.payload)
        .where(eq(crmInvoiceItems.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectInvoiceItemAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmInvoiceItems).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmInvoiceItems)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
