import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsVehicleRepository } from '@/repositories/tms/vehicles';
import {
  tmsVehicleInsertSchema,
  tmsVehicleSchema,
  tmsVehicleUpdateSchema,
} from '@/schemas/tms/vehicle';

export const selectTmsVehicle = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsVehicleSchema))
  .handler(async ({ data }) => {
    const repo = new TmsVehicleRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.vehicles'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.vehicles', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsVehicleSchema.array().parseAsync(result);
  });

export const createTmsVehicle = createServerFn({ method: 'POST' })
  .inputValidator(tmsVehicleInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsVehicleRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsVehicleSchema.parseAsync(result);
  });

export const updateTmsVehicle = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsVehicleUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsVehicleRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsVehicleSchema.parseAsync(result);
  });

export const removeTmsVehicle = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsVehicleRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
