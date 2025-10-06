import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmInvoiceRepository } from '@/repositories/crm/invoices';
import {
  crmInvoiceSchema,
  crmInvoiceInsertSchema,
  crmInvoiceUpdateSchema,
} from '@/schemas/crm/invoices';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmInvoice = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmInvoiceSchema))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.invoices'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.invoices', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmInvoiceSchema.array().parseAsync(result);
  });

export const createCrmInvoice = createServerFn({ method: 'POST' })
  .inputValidator(crmInvoiceInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmInvoiceSchema.parseAsync(result);
  });

export const updateCrmInvoice = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmInvoiceUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmInvoiceSchema.parseAsync(result);
  });

export const removeCrmInvoice = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmInvoiceRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM invoices will follow the contacts.ts pattern.
