import { z } from 'zod';

export const tmsShipmentLegEventSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  shipmentLegId: z.uuid({ message: 'Invalid UUID format for shipment leg ID' }),
  eventTimestamp: z.date({
    message: 'Invalid date format for event timestamp',
  }),
  location: z
    .string({ message: 'Location must be a string' })
    .optional()
    .nullable(),
  statusMessage: z
    .string({ message: 'Status message must be a string' })
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsShipmentLegEvent = z.infer<typeof tmsShipmentLegEventSchema>;

export const tmsShipmentLegEventInsertSchema = tmsShipmentLegEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsShipmentLegEventUpdateSchema =
  tmsShipmentLegEventInsertSchema.partial();
