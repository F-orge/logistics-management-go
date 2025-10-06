import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsDriverScheduleRepository } from '@/repositories/tms/driverSchedules';
import {
  tmsDriverScheduleInsertSchema,
  tmsDriverScheduleSchema,
  tmsDriverScheduleUpdateSchema,
} from '@/schemas/tms/driver_schedule';

export const selectTmsDriverSchedule = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsDriverScheduleSchema))
  .handler(async ({ data }) => {
    const repo = new TmsDriverScheduleRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.driverSchedules'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.driverSchedules', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsDriverScheduleSchema.array().parseAsync(result);
  });

export const createTmsDriverSchedule = createServerFn({ method: 'POST' })
  .inputValidator(tmsDriverScheduleInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsDriverScheduleRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsDriverScheduleSchema.parseAsync(result);
  });

export const updateTmsDriverSchedule = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsDriverScheduleUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsDriverScheduleRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsDriverScheduleSchema.parseAsync(result);
  });

export const removeTmsDriverSchedule = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsDriverScheduleRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
