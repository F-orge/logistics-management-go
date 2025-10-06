import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsCarrierRepository } from '@/repositories/tms/carriers';
import {
  tmsCarrierInsertSchema,
  tmsCarrierSchema,
  tmsCarrierUpdateSchema,
} from '@/schemas/tms/carrier';

export const selectTmsCarrier = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsCarrierSchema))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.carriers'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.carriers', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsCarrierSchema.array().parseAsync(result);
  });

export const createTmsCarrier = createServerFn({ method: 'POST' })
  .inputValidator(tmsCarrierInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsCarrierSchema.parseAsync(result);
  });

export const updateTmsCarrier = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsCarrierUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsCarrierSchema.parseAsync(result);
  });

export const removeTmsCarrier = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsCarrierRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
