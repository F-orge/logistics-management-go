import { z } from 'zod';

export const wmsOutboundShipmentSchema = z.object({
  id: z.string(),
  referenceNumber: z.string(),
  status: z.string(),
  shippedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsOutboundShipment = z.infer<typeof wmsOutboundShipmentSchema>;

export const wmsOutboundShipmentInsertSchema = wmsOutboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsOutboundShipmentUpdateSchema =
  wmsOutboundShipmentInsertSchema.partial();
