import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsBinThresholdRepository } from '@/repositories/wms/binThresholds';
import {
  wmsBinThresholdInsertSchema,
  wmsBinThresholdSchema,
  wmsBinThresholdUpdateSchema,
} from '@/schemas/wms/bin_threshold';

export const selectWmsBinThresholds = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsBinThresholdSchema))
  .handler(async ({ data }) => {
    const binThresholdRepository = new WmsBinThresholdRepository(kyselyDb);

    const result = await binThresholdRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.binThresholds'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.binThresholds', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsBinThresholdSchema.array().parseAsync(result);
  });

export const createWmsBinThreshold = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsBinThresholdInsertSchema)
  .handler(async ({ data }) => {
    const binThresholdRepository = new WmsBinThresholdRepository(kyselyDb);

    const result = await binThresholdRepository.create(data).executeTakeFirst();

    return wmsBinThresholdSchema.parseAsync(result);
  });

export const updateWmsBinThreshold = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsBinThresholdUpdateSchema }))
  .handler(async ({ data }) => {
    const binThresholdRepository = new WmsBinThresholdRepository(kyselyDb);

    const result = await binThresholdRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsBinThresholdSchema.parseAsync(result);
  });

export const removeWmsBinThreshold = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const binThresholdRepository = new WmsBinThresholdRepository(kyselyDb);

    const result = await binThresholdRepository.delete(data.id).executeTakeFirst();

    return result;
  });