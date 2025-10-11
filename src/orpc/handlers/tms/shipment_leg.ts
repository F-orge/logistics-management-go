import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/shipment_leg';
import { ShipmentLegRepository } from '@/repositories/tms/shipmentLegs';
import { HonoVariables } from '@/server';

export const paginateShipmentLeg = implement(
  tmsContracts.paginateShipmentLegContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeShipmentLeg = implement(tmsContracts.rangeShipmentLegContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inShipmentLeg = implement(tmsContracts.inShipmentLegContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo.in(input).execute();
  });

export const createShipmentLeg = implement(
  tmsContracts.createShipmentLegContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateShipmentLeg = implement(
  tmsContracts.updateShipmentLegContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteShipmentLeg = implement(
  tmsContracts.deleteShipmentLegContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
