import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsTaskItemRepository } from '@/repositories/wms/taskItems';
import {
  wmsTaskItemInsertSchema,
  wmsTaskItemSchema,
  wmsTaskItemUpdateSchema,
} from '@/schemas/wms/task_item';

export const selectWmsTaskItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsTaskItemSchema))
  .handler(async ({ data }) => {
    const taskItemRepository = new WmsTaskItemRepository(kyselyDb);

    const result = await taskItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.taskItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.taskItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsTaskItemSchema.array().parseAsync(result);
  });

export const createWmsTaskItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsTaskItemInsertSchema)
  .handler(async ({ data }) => {
    const taskItemRepository = new WmsTaskItemRepository(kyselyDb);

    const result = await taskItemRepository.create(data).executeTakeFirst();

    return wmsTaskItemSchema.parseAsync(result);
  });

export const updateWmsTaskItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsTaskItemUpdateSchema }))
  .handler(async ({ data }) => {
    const taskItemRepository = new WmsTaskItemRepository(kyselyDb);

    const result = await taskItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsTaskItemSchema.parseAsync(result);
  });

export const removeWmsTaskItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const taskItemRepository = new WmsTaskItemRepository(kyselyDb);

    const result = await taskItemRepository.delete(data.id).executeTakeFirst();

    return result;
  });
