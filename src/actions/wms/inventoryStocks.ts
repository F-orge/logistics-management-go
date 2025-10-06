import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsInventoryStockRepository } from '@/repositories/wms/inventoryStocks';
import {
  wmsInventoryStockInsertSchema,
  wmsInventoryStockSchema,
  wmsInventoryStockUpdateSchema,
} from '@/schemas/wms/inventory_stock';

export const selectWmsInventoryStocks = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsInventoryStockSchema))
  .handler(async ({ data }) => {
    const inventoryStockRepository = new WmsInventoryStockRepository(kyselyDb);

    const result = await inventoryStockRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.inventoryStock'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.inventoryStock', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsInventoryStockSchema.array().parseAsync(result);
  });

export const createWmsInventoryStock = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsInventoryStockInsertSchema)
  .handler(async ({ data }) => {
    const inventoryStockRepository = new WmsInventoryStockRepository(kyselyDb);

    const result = await inventoryStockRepository
      .create(data)
      .executeTakeFirst();

    return wmsInventoryStockSchema.parseAsync(result);
  });

export const updateWmsInventoryStock = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: wmsInventoryStockUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const inventoryStockRepository = new WmsInventoryStockRepository(kyselyDb);

    const result = await inventoryStockRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsInventoryStockSchema.parseAsync(result);
  });

export const removeWmsInventoryStock = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const inventoryStockRepository = new WmsInventoryStockRepository(kyselyDb);

    const result = await inventoryStockRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
