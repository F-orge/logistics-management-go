import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/inbound_shipment';
import { InboundShipmentRepository } from '@/repositories/wms/inboundShipments';
import { HonoVariables } from '@/server';

export const paginateInboundShipment = implement(
  wmsContracts.paginateInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInboundShipment = implement(
  wmsContracts.rangeInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInboundShipment = implement(
  wmsContracts.inInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo.in(input).execute();
  });

export const createInboundShipment = implement(
  wmsContracts.createInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInboundShipment = implement(
  wmsContracts.updateInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInboundShipment = implement(
  wmsContracts.deleteInboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
