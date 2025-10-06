import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDriverLocationRepository } from '@/repositories/dms/driverLocations';
import {
  dmsDriverLocationInsertSchema,
  dmsDriverLocationSchema,
  dmsDriverLocationUpdateSchema,
} from '@/schemas/dms/driver_location';

export const selectDmsDriverLocation = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDriverLocationSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDriverLocationRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.driverLocations'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.driverLocations', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDriverLocationSchema.array().parseAsync(result);
  });

export const createDmsDriverLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDriverLocationInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDriverLocationRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDriverLocationSchema.parseAsync(result);
  });

export const updateDmsDriverLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: dmsDriverLocationUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repository = new DmsDriverLocationRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDriverLocationSchema.parseAsync(result);
  });

export const removeDmsDriverLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDriverLocationRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
