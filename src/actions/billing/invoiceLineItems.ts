import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingInvoiceLineItemRepository } from '@/repositories/billing/invoiceLineItems';
import {
  billingInvoiceLineItemInsertSchema,
  billingInvoiceLineItemSchema,
  billingInvoiceLineItemUpdateSchema,
} from '@/schemas/billing/invoice_line_item';

export const selectBillingInvoiceLineItem = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingInvoiceLineItemSchema))
  .handler(async ({ data }) => {
    const invoiceLineItemRepository = new BillingInvoiceLineItemRepository(kyselyDb);

    const result = await invoiceLineItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.invoiceLineItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.invoiceLineItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingInvoiceLineItemSchema.array().parseAsync(result);
  });

export const createBillingInvoiceLineItem = createServerFn({
  method: 'POST',
})
  .inputValidator(billingInvoiceLineItemInsertSchema)
  .handler(async ({ data }) => {
    const invoiceLineItemRepository = new BillingInvoiceLineItemRepository(kyselyDb);

    const result = await invoiceLineItemRepository.create(data).executeTakeFirst();

    return billingInvoiceLineItemSchema.parseAsync(result);
  });

export const updateBillingInvoiceLineItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingInvoiceLineItemUpdateSchema }))
  .handler(async ({ data }) => {
    const invoiceLineItemRepository = new BillingInvoiceLineItemRepository(kyselyDb);

    const result = await invoiceLineItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingInvoiceLineItemSchema.parseAsync(result);
  });

export const removeBillingInvoiceLineItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const invoiceLineItemRepository = new BillingInvoiceLineItemRepository(kyselyDb);

    const result = await invoiceLineItemRepository.delete(data.id).executeTakeFirst();

    return result;
  });
