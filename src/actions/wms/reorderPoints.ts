import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsReorderPointRepository } from '@/repositories/wms/reorderPoints';
import {
  wmsReorderPointInsertSchema,
  wmsReorderPointSchema,
  wmsReorderPointUpdateSchema,
} from '@/schemas/wms/reorder_point';

export const selectWmsReorderPoints = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsReorderPointSchema))
  .handler(async ({ data }) => {
    const reorderPointRepository = new WmsReorderPointRepository(kyselyDb);

    const result = await reorderPointRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.reorderPoints'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.reorderPoints', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsReorderPointSchema.array().parseAsync(result);
  });

export const createWmsReorderPoint = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsReorderPointInsertSchema)
  .handler(async ({ data }) => {
    const reorderPointRepository = new WmsReorderPointRepository(kyselyDb);

    const result = await reorderPointRepository.create(data).executeTakeFirst();

    return wmsReorderPointSchema.parseAsync(result);
  });

export const updateWmsReorderPoint = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsReorderPointUpdateSchema }))
  .handler(async ({ data }) => {
    const reorderPointRepository = new WmsReorderPointRepository(kyselyDb);

    const result = await reorderPointRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsReorderPointSchema.parseAsync(result);
  });

export const removeWmsReorderPoint = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const reorderPointRepository = new WmsReorderPointRepository(kyselyDb);

    const result = await reorderPointRepository.delete(data.id).executeTakeFirst();

    return result;
  });
