import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDeliveryTaskRepository } from '@/repositories/dms/deliveryTasks';
import {
  dmsDeliveryTaskSchema,
  dmsDeliveryTaskInsertSchema,
  dmsDeliveryTaskUpdateSchema,
} from '@/schemas/dms/delivery_task';

export const selectDmsDeliveryTask = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDeliveryTaskSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryTaskRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.deliveryTasks'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.deliveryTasks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDeliveryTaskSchema.array().parseAsync(result);
  });

export const createDmsDeliveryTask = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDeliveryTaskInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryTaskRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDeliveryTaskSchema.parseAsync(result);
  });

export const updateDmsDeliveryTask = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDeliveryTaskUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryTaskRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDeliveryTaskSchema.parseAsync(result);
  });

export const removeDmsDeliveryTask = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryTaskRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
