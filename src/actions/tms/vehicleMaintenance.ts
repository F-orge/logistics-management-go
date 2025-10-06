import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsVehicleMaintenanceRepository } from '@/repositories/tms/vehicleMaintenance';
import {
  tmsVehicleMaintenanceInsertSchema,
  tmsVehicleMaintenanceSchema,
  tmsVehicleMaintenanceUpdateSchema,
} from '@/schemas/tms/vehicle_maintenance';

export const selectTmsVehicleMaintenance = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsVehicleMaintenanceSchema))
  .handler(async ({ data }) => {
    const repo = new TmsVehicleMaintenanceRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'tms.vehicleMaintenance'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.vehicleMaintenance', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsVehicleMaintenanceSchema.array().parseAsync(result);
  });

export const createTmsVehicleMaintenance = createServerFn({ method: 'POST' })
  .inputValidator(tmsVehicleMaintenanceInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsVehicleMaintenanceRepository(kyselyDb);

    const result = await repo.create(data as any).executeTakeFirst();

    return tmsVehicleMaintenanceSchema.parseAsync(result);
  });

export const updateTmsVehicleMaintenance = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsVehicleMaintenanceUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsVehicleMaintenanceRepository(kyselyDb);

    const result = await repo
      .update(data.id, data.value as any)
      .executeTakeFirst();

    return tmsVehicleMaintenanceSchema.parseAsync(result);
  });

export const removeTmsVehicleMaintenance = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsVehicleMaintenanceRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
