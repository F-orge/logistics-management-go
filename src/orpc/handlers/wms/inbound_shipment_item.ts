import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/inbound_shipment_item';
import { InboundShipmentItemRepository } from '@/repositories/wms/inboundShipmentItems';
import { HonoVariables } from '@/server';

export const paginateInboundShipmentItem = implement(
  wmsContracts.paginateInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInboundShipmentItem = implement(
  wmsContracts.rangeInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInboundShipmentItem = implement(
  wmsContracts.inInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createInboundShipmentItem = implement(
  wmsContracts.createInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInboundShipmentItem = implement(
  wmsContracts.updateInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInboundShipmentItem = implement(
  wmsContracts.deleteInboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InboundShipmentItemRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
