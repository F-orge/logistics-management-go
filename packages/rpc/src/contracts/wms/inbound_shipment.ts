import { oc } from '@orpc/contract'
import {
  InboundShipmentItemRepository,
  InboundShipmentRepository,
} from '@packages/db/repositories/wms'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { InboundShipmentSchema } from '@packages/db/schemas/wms/inbound_shipment'
import { InboundShipmentItemSchema } from '@packages/db/schemas/wms/inbound_shipment_item'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = InboundShipmentSchema.extend({
  client: CompanySchema.optional(),
  warehouse: WarehouseSchema,
  items: InboundShipmentItemSchema.extend({
    product: ProductSchema,
  }).array(),
})

export const PaginateInboundShipmentContract = oc
  .input(InboundShipmentRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeInboundShipmentContract = oc
  .input(InboundShipmentRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyInboundShipmentContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertInboundShipmentContract = oc
  .input(
    InboundShipmentRepository.schemas.InsertSchema.extend({
      items: InboundShipmentItemRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyInboundShipmentContract = oc
  .input(
    InboundShipmentRepository.schemas.InsertSchema.extend({
      items: InboundShipmentItemRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdateInboundShipmentContract = oc
  .input(z.object({ id: z.uuid(), value: InboundShipmentRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveInboundShipmentContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertInboundShipmentItemContract = oc
  .input(InboundShipmentItemRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyInboundShipmentItemContract = oc
  .input(InboundShipmentItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateInboundShipmentItemContract = oc
  .input(z.object({ id: z.uuid(), value: InboundShipmentItemRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveInboundShipmentItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
