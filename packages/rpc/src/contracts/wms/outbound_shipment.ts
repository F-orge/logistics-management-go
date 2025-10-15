import { oc } from '@orpc/contract'
import {
  OutboundShipmentItemRepository,
  OutboundShipmentRepository,
} from '@packages/db/repositories/wms'
import { OutboundShipmentSchema } from '@packages/db/schemas/wms/outbound_shipment'
import { OutboundShipmentItemSchema } from '@packages/db/schemas/wms/outbound_shipment_item'
import { SalesOrderSchema } from '@packages/db/schemas/wms/sales_order'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = OutboundShipmentSchema.extend({
  salesOrder: SalesOrderSchema,
  warehouse: WarehouseSchema,
  items: OutboundShipmentItemSchema.array(),
})

export const PaginateOutboundShipmentContract = oc
  .input(OutboundShipmentRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeOutboundShipmentContract = oc
  .input(OutboundShipmentRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyOutboundShipmentContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertOutboundShipmentContract = oc
  .input(
    OutboundShipmentRepository.schemas.InsertSchema.extend({
      items: OutboundShipmentItemRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyOutboundShipmentContract = oc
  .input(
    OutboundShipmentRepository.schemas.InsertSchema.extend({
      items: OutboundShipmentItemRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdateOutboundShipmentContract = oc
  .input(z.object({ id: z.uuid(), value: OutboundShipmentRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveOutboundShipmentContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertOutboundShipmentItemContract = oc
  .input(OutboundShipmentItemRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyOutboundShipmentItemContract = oc
  .input(OutboundShipmentItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateOutboundShipmentItemContract = oc
  .input(z.object({ id: z.uuid(), value: OutboundShipmentItemRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveOutboundShipmentItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
