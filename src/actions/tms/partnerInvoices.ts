import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsPartnerInvoiceRepository } from '@/repositories/tms/partnerInvoices';
import {
  tmsPartnerInvoiceInsertSchema,
  tmsPartnerInvoiceSchema,
  tmsPartnerInvoiceUpdateSchema,
} from '@/schemas/tms/partner_invoice';

export const selectTmsPartnerInvoice = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsPartnerInvoiceSchema))
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.partnerInvoices'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.partnerInvoices', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsPartnerInvoiceSchema.array().parseAsync(result);
  });

export const createTmsPartnerInvoice = createServerFn({ method: 'POST' })
  .inputValidator(tmsPartnerInvoiceInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsPartnerInvoiceSchema.parseAsync(result);
  });

export const updateTmsPartnerInvoice = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsPartnerInvoiceUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsPartnerInvoiceSchema.parseAsync(result);
  });

export const removeTmsPartnerInvoice = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
