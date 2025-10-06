import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsInventoryBatchRepository } from '@/repositories/wms/inventoryBatches';
import {
  wmsInventoryBatchInsertSchema,
  wmsInventoryBatchSchema,
  wmsInventoryBatchUpdateSchema,
} from '@/schemas/wms/inventory_batch';

export const selectWmsInventoryBatches = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsInventoryBatchSchema))
  .handler(async ({ data }) => {
    const inventoryBatchRepository = new WmsInventoryBatchRepository(kyselyDb);

    const result = await inventoryBatchRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.inventoryBatches'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.inventoryBatches', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsInventoryBatchSchema.array().parseAsync(result);
  });

export const createWmsInventoryBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsInventoryBatchInsertSchema)
  .handler(async ({ data }) => {
    const inventoryBatchRepository = new WmsInventoryBatchRepository(kyselyDb);

    const result = await inventoryBatchRepository.create(data).executeTakeFirst();

    return wmsInventoryBatchSchema.parseAsync(result);
  });

export const updateWmsInventoryBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsInventoryBatchUpdateSchema }))
  .handler(async ({ data }) => {
    const inventoryBatchRepository = new WmsInventoryBatchRepository(kyselyDb);

    const result = await inventoryBatchRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsInventoryBatchSchema.parseAsync(result);
  });

export const removeWmsInventoryBatch = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const inventoryBatchRepository = new WmsInventoryBatchRepository(kyselyDb);

    const result = await inventoryBatchRepository.delete(data.id).executeTakeFirst();

    return result;
  });