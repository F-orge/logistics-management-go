import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsInventoryAdjustmentRepository } from '@/repositories/wms/inventoryAdjustments';
import {
  wmsInventoryAdjustmentInsertSchema,
  wmsInventoryAdjustmentSchema,
  wmsInventoryAdjustmentUpdateSchema,
} from '@/schemas/wms/inventory_adjustment';

export const selectWmsInventoryAdjustments = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsInventoryAdjustmentSchema))
  .handler(async ({ data }) => {
    const inventoryAdjustmentRepository = new WmsInventoryAdjustmentRepository(kyselyDb);

    const result = await inventoryAdjustmentRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.inventoryAdjustments'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.inventoryAdjustments', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsInventoryAdjustmentSchema.array().parseAsync(result);
  });

export const createWmsInventoryAdjustment = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsInventoryAdjustmentInsertSchema)
  .handler(async ({ data }) => {
    const inventoryAdjustmentRepository = new WmsInventoryAdjustmentRepository(kyselyDb);

    const result = await inventoryAdjustmentRepository.create(data).executeTakeFirst();

    return wmsInventoryAdjustmentSchema.parseAsync(result);
  });

export const updateWmsInventoryAdjustment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsInventoryAdjustmentUpdateSchema }))
  .handler(async ({ data }) => {
    const inventoryAdjustmentRepository = new WmsInventoryAdjustmentRepository(kyselyDb);

    const result = await inventoryAdjustmentRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsInventoryAdjustmentSchema.parseAsync(result);
  });

export const removeWmsInventoryAdjustment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const inventoryAdjustmentRepository = new WmsInventoryAdjustmentRepository(kyselyDb);

    const result = await inventoryAdjustmentRepository.delete(data.id).executeTakeFirst();

    return result;
  });
