import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsSalesOrderRepository } from '@/repositories/wms/salesOrders';
import {
  wmsSalesOrderInsertSchema,
  wmsSalesOrderSchema,
  wmsSalesOrderUpdateSchema,
} from '@/schemas/wms/sales_order';

export const selectWmsSalesOrders = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsSalesOrderSchema))
  .handler(async ({ data }) => {
    const salesOrderRepository = new WmsSalesOrderRepository(kyselyDb);

    const result = await salesOrderRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.salesOrders'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.salesOrders', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsSalesOrderSchema.array().parseAsync(result);
  });

export const createWmsSalesOrder = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsSalesOrderInsertSchema)
  .handler(async ({ data }) => {
    const salesOrderRepository = new WmsSalesOrderRepository(kyselyDb);

    const result = await salesOrderRepository.create(data).executeTakeFirst();

    return wmsSalesOrderSchema.parseAsync(result);
  });

export const updateWmsSalesOrder = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsSalesOrderUpdateSchema }))
  .handler(async ({ data }) => {
    const salesOrderRepository = new WmsSalesOrderRepository(kyselyDb);

    const result = await salesOrderRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsSalesOrderSchema.parseAsync(result);
  });

export const removeWmsSalesOrder = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const salesOrderRepository = new WmsSalesOrderRepository(kyselyDb);

    const result = await salesOrderRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
