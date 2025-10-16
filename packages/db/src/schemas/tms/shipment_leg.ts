import { z } from 'zod'
import { TmsShipmentLegStatusEnum } from '../../db.types'
import { ShipmentLegEventInsertSchema } from './shipment_leg_event'

export const ShipmentLegSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  carrierId: z.uuid({ message: 'Invalid UUID format for carrier ID' }).optional().nullable(),
  internalTripId: z
    .uuid({ message: 'Invalid UUID format for internal trip ID' })
    .optional()
    .nullable(),
  origin: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  status: z
    .enum(TmsShipmentLegStatusEnum, { message: 'Invalid shipment leg status' })
    .optional()
    .nullable(),
  scheduledPickup: z.date().optional().nullable(),
  scheduledDelivery: z.date().optional().nullable(),
  actualPickup: z.date().optional().nullable(),
  actualDelivery: z.date().optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsShipmentLeg = z.infer<typeof ShipmentLegSchema>

export const ShipmentLegInsertSchema = ShipmentLegSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  events: z.array(ShipmentLegEventInsertSchema).optional().nullable(),
})

export const ShipmentLegUpdateSchema = ShipmentLegInsertSchema.partial()
