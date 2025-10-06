import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsSalesOrderItemRepository } from '@/repositories/wms/salesOrderItems';
import {
  wmsSalesOrderItemInsertSchema,
  wmsSalesOrderItemSchema,
  wmsSalesOrderItemUpdateSchema,
} from '@/schemas/wms/sales_order_item';

export const selectWmsSalesOrderItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsSalesOrderItemSchema))
  .handler(async ({ data }) => {
    const salesOrderItemRepository = new WmsSalesOrderItemRepository(kyselyDb);

    const result = await salesOrderItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.salesOrderItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.salesOrderItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsSalesOrderItemSchema.array().parseAsync(result);
  });

export const createWmsSalesOrderItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsSalesOrderItemInsertSchema)
  .handler(async ({ data }) => {
    const salesOrderItemRepository = new WmsSalesOrderItemRepository(kyselyDb);

    const result = await salesOrderItemRepository
      .create(data)
      .executeTakeFirst();

    return wmsSalesOrderItemSchema.parseAsync(result);
  });

export const updateWmsSalesOrderItem = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: wmsSalesOrderItemUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const salesOrderItemRepository = new WmsSalesOrderItemRepository(kyselyDb);

    const result = await salesOrderItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsSalesOrderItemSchema.parseAsync(result);
  });

export const removeWmsSalesOrderItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const salesOrderItemRepository = new WmsSalesOrderItemRepository(kyselyDb);

    const result = await salesOrderItemRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
