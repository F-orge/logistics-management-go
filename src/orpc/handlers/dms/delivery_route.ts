import { implement } from '@orpc/server';
import * as dmsContracts from '@/orpc/contracts/dms/delivery_route';
import { DeliveryRouteRepository } from '@/repositories/dms/deliveryRoutes';
import { HonoVariables } from '@/server';

export const paginateDeliveryRoute = implement(
  dmsContracts.paginateDeliveryRouteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    const result = await repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();

    console.log(result);

    return result;
  });

export const rangeDeliveryRoute = implement(
  dmsContracts.rangeDeliveryRouteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inDeliveryRoute = implement(dmsContracts.inDeliveryRouteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    return repo.in(input).execute();
  });

export const createDeliveryRoute = implement(
  dmsContracts.createDeliveryRouteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateDeliveryRoute = implement(
  dmsContracts.updateDeliveryRouteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteDeliveryRoute = implement(
  dmsContracts.deleteDeliveryRouteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryRouteRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
