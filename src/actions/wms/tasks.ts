import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsTaskRepository } from '@/repositories/wms/tasks';
import {
  wmsTaskInsertSchema,
  wmsTaskSchema,
  wmsTaskUpdateSchema,
} from '@/schemas/wms/task';

export const selectWmsTasks = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsTaskSchema))
  .handler(async ({ data }) => {
    const taskRepository = new WmsTaskRepository(kyselyDb);

    const result = await taskRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.tasks'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.tasks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsTaskSchema.array().parseAsync(result);
  });

export const createWmsTask = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsTaskInsertSchema)
  .handler(async ({ data }) => {
    const taskRepository = new WmsTaskRepository(kyselyDb);

    const result = await taskRepository.create(data).executeTakeFirst();

    return wmsTaskSchema.parseAsync(result);
  });

export const updateWmsTask = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsTaskUpdateSchema }))
  .handler(async ({ data }) => {
    const taskRepository = new WmsTaskRepository(kyselyDb);

    const result = await taskRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsTaskSchema.parseAsync(result);
  });

export const removeWmsTask = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const taskRepository = new WmsTaskRepository(kyselyDb);

    const result = await taskRepository.delete(data.id).executeTakeFirst();

    return result;
  });
