import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsCarrierRateRepository } from '@/repositories/tms/carrierRates';
import {
  tmsCarrierRateInsertSchema,
  tmsCarrierRateSchema,
  tmsCarrierRateUpdateSchema,
} from '@/schemas/tms/carrier_rate';

export const selectTmsCarrierRate = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsCarrierRateSchema))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRateRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.carrierRates'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.carrierRates', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsCarrierRateSchema.array().parseAsync(result);
  });

export const createTmsCarrierRate = createServerFn({ method: 'POST' })
  .inputValidator(tmsCarrierRateInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRateRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsCarrierRateSchema.parseAsync(result);
  });

export const updateTmsCarrierRate = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsCarrierRateUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRateRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsCarrierRateSchema.parseAsync(result);
  });

export const removeTmsCarrierRate = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRateRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
