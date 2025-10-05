import { z } from 'zod';

export const tmsShipmentLegEventSchema = z.object({
  id: z.string(),
  shipmentLegId: z.uuid(),
  event: z.string(),
  eventAt: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
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
