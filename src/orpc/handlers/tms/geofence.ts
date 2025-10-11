import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/geofence';
import { GeofenceRepository } from '@/repositories/tms/geofences';
import { HonoVariables } from '@/server';

export const paginateGeofence = implement(tmsContracts.paginateGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeGeofence = implement(tmsContracts.rangeGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inGeofence = implement(tmsContracts.inGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo.in(input).execute();
  });

export const createGeofence = implement(tmsContracts.createGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateGeofence = implement(tmsContracts.updateGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteGeofence = implement(tmsContracts.deleteGeofenceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
