import { implement } from '@orpc/server';
import * as dmsContracts from '@/orpc/contracts/dms/driver_location';
import { DriverLocationRepository } from '@/repositories/dms/driverLocations';
import { HonoVariables } from '@/server';

export const paginateDriverLocation = implement(
  dmsContracts.paginateDriverLocationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeDriverLocation = implement(
  dmsContracts.rangeDriverLocationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inDriverLocation = implement(dmsContracts.inDriverLocationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo.in(input).execute();
  });

export const createDriverLocation = implement(
  dmsContracts.createDriverLocationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateDriverLocation = implement(
  dmsContracts.updateDriverLocationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteDriverLocation = implement(
  dmsContracts.deleteDriverLocationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverLocationRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
