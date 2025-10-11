import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms';
import { WmsLocationRepository } from '@/repositories/wms/locations';
import { HonoVariables } from '@/server';

export const paginateLocation = implement(wmsContracts.paginateLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeLocation = implement(wmsContracts.rangeLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inLocation = implement(wmsContracts.inLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo.in(input).execute();
  });

export const createLocation = implement(wmsContracts.createLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateLocation = implement(wmsContracts.updateLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteLocation = implement(wmsContracts.deleteLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsLocationRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
