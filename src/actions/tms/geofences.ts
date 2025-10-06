import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsGeofenceRepository } from '@/repositories/tms/geofences';
import {
  tmsGeofenceInsertSchema,
  tmsGeofenceSchema,
  tmsGeofenceUpdateSchema,
} from '@/schemas/tms/geofence';

export const selectTmsGeofence = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsGeofenceSchema))
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.geofences'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.geofences', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsGeofenceSchema.array().parseAsync(result);
  });

export const createTmsGeofence = createServerFn({ method: 'POST' })
  .inputValidator(tmsGeofenceInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsGeofenceSchema.parseAsync(result);
  });

export const updateTmsGeofence = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsGeofenceUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsGeofenceSchema.parseAsync(result);
  });

export const removeTmsGeofence = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
