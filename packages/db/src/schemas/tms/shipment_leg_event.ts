import { z } from 'zod'

export const ShipmentLegEventSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  shipmentLegId: z.uuid({ message: 'Invalid UUID format for shipment leg ID' }),
  eventTimestamp: z.date({
    message: 'Invalid date format for event timestamp',
  }),
  location: z.string({ message: 'Location must be a string' }).optional().nullable(),
  statusMessage: z.string({ message: 'Status message must be a string' }).optional().nullable(),
})

export type TmsShipmentLegEvent = z.infer<typeof ShipmentLegEventSchema>

export const ShipmentLegEventInsertSchema = ShipmentLegEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const ShipmentLegEventUpdateSchema = ShipmentLegEventInsertSchema.partial()
