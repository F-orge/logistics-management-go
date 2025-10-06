import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsWarehouseRepository } from '@/repositories/wms/warehouses';
import {
  wmsWarehouseInsertSchema,
  wmsWarehouseSchema,
  wmsWarehouseUpdateSchema,
} from '@/schemas/wms/warehouse';

export const selectWmsWarehouses = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsWarehouseSchema))
  .handler(async ({ data }) => {
    const warehouseRepository = new WmsWarehouseRepository(kyselyDb);

    const result = await warehouseRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.warehouses'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.warehouses', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsWarehouseSchema.array().parseAsync(result);
  });

export const createWmsWarehouse = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsWarehouseInsertSchema)
  .handler(async ({ data }) => {
    const warehouseRepository = new WmsWarehouseRepository(kyselyDb);

    const result = await warehouseRepository.create(data).executeTakeFirst();

    return wmsWarehouseSchema.parseAsync(result);
  });

export const updateWmsWarehouse = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsWarehouseUpdateSchema }))
  .handler(async ({ data }) => {
    const warehouseRepository = new WmsWarehouseRepository(kyselyDb);

    const result = await warehouseRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsWarehouseSchema.parseAsync(result);
  });

export const removeWmsWarehouse = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const warehouseRepository = new WmsWarehouseRepository(kyselyDb);

    const result = await warehouseRepository.delete(data.id).executeTakeFirst();

    return result;
  });
