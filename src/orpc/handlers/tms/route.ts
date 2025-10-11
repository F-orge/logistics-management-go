import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms';
import { TmsRouteRepository } from '@/repositories/tms/routes';
import { HonoVariables } from '@/server';

export const paginateRoute = implement(tmsContracts.paginateRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeRoute = implement(tmsContracts.rangeRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inRoute = implement(tmsContracts.inRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo.in(input).execute();
  });

export const createRoute = implement(tmsContracts.createRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateRoute = implement(tmsContracts.updateRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteRoute = implement(tmsContracts.deleteRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsRouteRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
