import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsPickBatchRepository } from '@/repositories/wms/pickBatches';
import {
  wmsPickBatchInsertSchema,
  wmsPickBatchSchema,
  wmsPickBatchUpdateSchema,
} from '@/schemas/wms/pick_batch';

export const selectWmsPickBatches = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsPickBatchSchema))
  .handler(async ({ data }) => {
    const pickBatchRepository = new WmsPickBatchRepository(kyselyDb);

    const result = await pickBatchRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.pickBatches'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.pickBatches', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsPickBatchSchema.array().parseAsync(result);
  });

export const createWmsPickBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsPickBatchInsertSchema)
  .handler(async ({ data }) => {
    const pickBatchRepository = new WmsPickBatchRepository(kyselyDb);

    const result = await pickBatchRepository.create(data).executeTakeFirst();

    return wmsPickBatchSchema.parseAsync(result);
  });

export const updateWmsPickBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsPickBatchUpdateSchema }))
  .handler(async ({ data }) => {
    const pickBatchRepository = new WmsPickBatchRepository(kyselyDb);

    const result = await pickBatchRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsPickBatchSchema.parseAsync(result);
  });

export const removeWmsPickBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const pickBatchRepository = new WmsPickBatchRepository(kyselyDb);

    const result = await pickBatchRepository.delete(data.id).executeTakeFirst();

    return result;
  });
