import { z } from 'zod'
import { WmsInboundShipmentStatusEnum } from '../../db.types'

export const InboundShipmentSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }).nullable().optional(),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  status: z
    .enum(WmsInboundShipmentStatusEnum, {
      message: 'Invalid inbound shipment status',
    })
    .nullable()
    .optional(),
  expectedArrivalDate: z
    .date({ message: 'Invalid date format for expected arrival date' })
    .nullable()
    .optional(),
  actualArrivalDate: z
    .date({ message: 'Invalid date format for actual arrival date' })
    .nullable()
    .optional(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional(),
})

export type WmsInboundShipment = z.infer<typeof InboundShipmentSchema>

export const InboundShipmentInsertSchema = InboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const InboundShipmentUpdateSchema = InboundShipmentInsertSchema.partial()
