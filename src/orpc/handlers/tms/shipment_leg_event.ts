import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/shipment_leg_event';
import { ShipmentLegEventRepository } from '@/repositories/tms/shipmentLegEvents';
import { HonoVariables } from '@/server';

export const paginateShipmentLegEvent = implement(
  tmsContracts.paginateShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeShipmentLegEvent = implement(
  tmsContracts.rangeShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inShipmentLegEvent = implement(
  tmsContracts.inShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo.in(input).execute();
  });

export const createShipmentLegEvent = implement(
  tmsContracts.createShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateShipmentLegEvent = implement(
  tmsContracts.updateShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteShipmentLegEvent = implement(
  tmsContracts.deleteShipmentLegEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ShipmentLegEventRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
