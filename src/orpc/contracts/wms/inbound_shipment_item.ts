import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsInboundShipmentItemInsertSchema,
  wmsInboundShipmentItemSchema,
  wmsInboundShipmentItemUpdateSchema,
} from '@/schemas/wms/inbound_shipment_item'

export const paginateInboundShipmentItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsInboundShipmentItemSchema),
        sort: sortTransformer(wmsInboundShipmentItemSchema),
      }),
    ),
  )
  .output(z.array(wmsInboundShipmentItemSchema))

export const rangeInboundShipmentItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsInboundShipmentItemSchema),
        sort: sortTransformer(wmsInboundShipmentItemSchema),
      }),
    ),
  )
  .output(z.array(wmsInboundShipmentItemSchema))

export const inInboundShipmentItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsInboundShipmentItemSchema))

export const createInboundShipmentItemContract = oc
  .input(wmsInboundShipmentItemInsertSchema)
  .output(wmsInboundShipmentItemSchema)

export const updateInboundShipmentItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsInboundShipmentItemUpdateSchema }))
  .output(wmsInboundShipmentItemSchema)

export const deleteInboundShipmentItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
