import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsGeofenceEventRepository } from '@/repositories/tms/geofenceEvents';
import {
  tmsGeofenceEventInsertSchema,
  tmsGeofenceEventSchema,
  tmsGeofenceEventUpdateSchema,
} from '@/schemas/tms/geofence_event';

export const selectTmsGeofenceEvent = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsGeofenceEventSchema))
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceEventRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.geofenceEvents'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.geofenceEvents', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsGeofenceEventSchema.array().parseAsync(result);
  });

export const createTmsGeofenceEvent = createServerFn({ method: 'POST' })
  .inputValidator(tmsGeofenceEventInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceEventRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsGeofenceEventSchema.parseAsync(result);
  });

export const updateTmsGeofenceEvent = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsGeofenceEventUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceEventRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsGeofenceEventSchema.parseAsync(result);
  });

export const removeTmsGeofenceEvent = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsGeofenceEventRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
