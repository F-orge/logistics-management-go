import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingInvoiceRepository } from '@/repositories/billing/invoices';
import {
  billingInvoiceInsertSchema,
  billingInvoiceSchema,
  billingInvoiceUpdateSchema,
} from '@/schemas/billing/invoice';

export const selectBillingInvoice = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingInvoiceSchema))
  .handler(async ({ data }) => {
    const invoiceRepository = new BillingInvoiceRepository(kyselyDb);

    const result = await invoiceRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.invoices'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.invoices', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingInvoiceSchema.array().parseAsync(result);
  });

export const createBillingInvoice = createServerFn({
  method: 'POST',
})
  .inputValidator(billingInvoiceInsertSchema)
  .handler(async ({ data }) => {
    const invoiceRepository = new BillingInvoiceRepository(kyselyDb);

    const result = await invoiceRepository.create(data).executeTakeFirst();

    return billingInvoiceSchema.parseAsync(result);
  });

export const updateBillingInvoice = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingInvoiceUpdateSchema }))
  .handler(async ({ data }) => {
    const invoiceRepository = new BillingInvoiceRepository(kyselyDb);

    const result = await invoiceRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingInvoiceSchema.parseAsync(result);
  });

export const removeBillingInvoice = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const invoiceRepository = new BillingInvoiceRepository(kyselyDb);

    const result = await invoiceRepository.delete(data.id).executeTakeFirst();

    return result;
  });
