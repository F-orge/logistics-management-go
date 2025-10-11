import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/outbound_shipment';
import { OutboundShipmentRepository } from '@/repositories/wms/outboundShipments';
import { HonoVariables } from '@/server';

export const paginateOutboundShipment = implement(
  wmsContracts.paginateOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeOutboundShipment = implement(
  wmsContracts.rangeOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inOutboundShipment = implement(
  wmsContracts.inOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo.in(input).execute();
  });

export const createOutboundShipment = implement(
  wmsContracts.createOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateOutboundShipment = implement(
  wmsContracts.updateOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteOutboundShipment = implement(
  wmsContracts.deleteOutboundShipmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
