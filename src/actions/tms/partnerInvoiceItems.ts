import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsPartnerInvoiceItemRepository } from '@/repositories/tms/partnerInvoiceItems';
import {
  tmsPartnerInvoiceItemInsertSchema,
  tmsPartnerInvoiceItemSchema,
  tmsPartnerInvoiceItemUpdateSchema,
} from '@/schemas/tms/partner_invoice_item';

export const selectTmsPartnerInvoiceItem = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsPartnerInvoiceItemSchema))
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceItemRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'tms.partnerInvoiceItems'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.partnerInvoiceItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsPartnerInvoiceItemSchema.array().parseAsync(result);
  });

export const createTmsPartnerInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(tmsPartnerInvoiceItemInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceItemRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsPartnerInvoiceItemSchema.parseAsync(result);
  });

export const updateTmsPartnerInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsPartnerInvoiceItemUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceItemRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsPartnerInvoiceItemSchema.parseAsync(result);
  });

export const removeTmsPartnerInvoiceItem = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsPartnerInvoiceItemRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
