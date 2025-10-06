import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmInvoiceItemRepository } from '@/repositories/crm/invoiceItems';
import {
  crmInvoiceItemInsertSchema,
  crmInvoiceItemSchema,
  crmInvoiceItemUpdateSchema,
} from '@/schemas/crm/invoice_items';

export const selectCrmInvoiceItem = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmInvoiceItemSchema))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceItemRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.invoiceItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.invoiceItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmInvoiceItemSchema.array().parseAsync(result);
  });

export const createCrmInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(crmInvoiceItemInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceItemRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmInvoiceItemSchema.parseAsync(result);
  });

export const updateCrmInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmInvoiceItemUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceItemRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmInvoiceItemSchema.parseAsync(result);
  });

export const removeCrmInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceItemRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM invoice items will follow the contacts.ts pattern.
