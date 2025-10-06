import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsReturnItemRepository } from '@/repositories/wms/returnItems';
import {
  wmsReturnItemInsertSchema,
  wmsReturnItemSchema,
  wmsReturnItemUpdateSchema,
} from '@/schemas/wms/return_item';

export const selectWmsReturnItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsReturnItemSchema))
  .handler(async ({ data }) => {
    const returnItemRepository = new WmsReturnItemRepository(kyselyDb);

    const result = await returnItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.returnItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.returnItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsReturnItemSchema.array().parseAsync(result);
  });

export const createWmsReturnItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsReturnItemInsertSchema)
  .handler(async ({ data }) => {
    const returnItemRepository = new WmsReturnItemRepository(kyselyDb);

    const result = await returnItemRepository.create(data).executeTakeFirst();

    return wmsReturnItemSchema.parseAsync(result);
  });

export const updateWmsReturnItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsReturnItemUpdateSchema }))
  .handler(async ({ data }) => {
    const returnItemRepository = new WmsReturnItemRepository(kyselyDb);

    const result = await returnItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsReturnItemSchema.parseAsync(result);
  });

export const removeWmsReturnItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const returnItemRepository = new WmsReturnItemRepository(kyselyDb);

    const result = await returnItemRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
