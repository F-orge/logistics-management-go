import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/outbound_shipment_item'
import { OutboundShipmentItemRepository } from '@/repositories/wms/outboundShipmentItems'
import type { HonoVariables } from '@/server'

export const paginateOutboundShipmentItem = implement(
  wmsContracts.paginateOutboundShipmentItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeOutboundShipmentItem = implement(wmsContracts.rangeOutboundShipmentItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inOutboundShipmentItem = implement(wmsContracts.inOutboundShipmentItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.in(input).execute()
  })

export const createOutboundShipmentItem = implement(wmsContracts.createOutboundShipmentItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateOutboundShipmentItem = implement(wmsContracts.updateOutboundShipmentItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteOutboundShipmentItem = implement(wmsContracts.deleteOutboundShipmentItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OutboundShipmentItemRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
