import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsTaskEventRepository } from '@/repositories/dms/taskEvents';
import {
  dmsTaskEventSchema,
  dmsTaskEventInsertSchema,
  dmsTaskEventUpdateSchema,
} from '@/schemas/dms/task_event';

export const selectDmsTaskEvent = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsTaskEventSchema))
  .handler(async ({ data }) => {
    const repository = new DmsTaskEventRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.taskEvents'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.taskEvents', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsTaskEventSchema.array().parseAsync(result);
  });

export const createDmsTaskEvent = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsTaskEventInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsTaskEventRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsTaskEventSchema.parseAsync(result);
  });

export const updateDmsTaskEvent = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsTaskEventUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsTaskEventRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsTaskEventSchema.parseAsync(result);
  });

export const removeDmsTaskEvent = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsTaskEventRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
