import { z } from 'zod';

export const tmsShipmentLegEventSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  shipmentLegId: z.uuid({ message: 'Invalid UUID format for shipment leg ID' }),
  event: z
    .string({ message: 'Event must be a string' })
    .min(1, { error: 'Event is required' })
    .max(255, { error: 'Event must be at most 255 characters' }),
  eventAt: z.date({ message: 'Invalid date format for event at' }).optional(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type TmsShipmentLegEvent = z.infer<typeof tmsShipmentLegEventSchema>;

export const tmsShipmentLegEventInsertSchema = tmsShipmentLegEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsShipmentLegEventUpdateSchema =
  tmsShipmentLegEventInsertSchema.partial();
