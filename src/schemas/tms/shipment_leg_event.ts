import { z } from 'zod';

export const tmsShipmentLegEventSchema = z.object({
  id: z.uuid(),
  shipmentLegId: z.uuid(),
  event: z
    .string()
    .min(1, { error: 'Event is required' })
    .max(255, { error: 'Event must be at most 255 characters' }),
  eventAt: z.iso.datetime().nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsShipmentLegEvent = z.infer<typeof tmsShipmentLegEventSchema>;

export const tmsShipmentLegEventInsertSchema = tmsShipmentLegEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsShipmentLegEventUpdateSchema =
  tmsShipmentLegEventInsertSchema.partial();
