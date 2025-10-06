import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsPickBatchItemRepository } from '@/repositories/wms/pickBatchItems';
import {
  wmsPickBatchItemInsertSchema,
  wmsPickBatchItemSchema,
  wmsPickBatchItemUpdateSchema,
} from '@/schemas/wms/pick_batch_item';

export const selectWmsPickBatchItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsPickBatchItemSchema))
  .handler(async ({ data }) => {
    const pickBatchItemRepository = new WmsPickBatchItemRepository(kyselyDb);

    const result = await pickBatchItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.pickBatchItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.pickBatchItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsPickBatchItemSchema.array().parseAsync(result);
  });

export const createWmsPickBatchItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsPickBatchItemInsertSchema)
  .handler(async ({ data }) => {
    const pickBatchItemRepository = new WmsPickBatchItemRepository(kyselyDb);

    const result = await pickBatchItemRepository
      .create(data)
      .executeTakeFirst();

    return wmsPickBatchItemSchema.parseAsync(result);
  });

export const updateWmsPickBatchItem = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: wmsPickBatchItemUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const pickBatchItemRepository = new WmsPickBatchItemRepository(kyselyDb);

    const result = await pickBatchItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsPickBatchItemSchema.parseAsync(result);
  });

export const removeWmsPickBatchItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const pickBatchItemRepository = new WmsPickBatchItemRepository(kyselyDb);

    const result = await pickBatchItemRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
