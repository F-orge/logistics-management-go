import { z } from 'zod';

export const wmsInboundShipmentSchema = z.object({
  id: z.string(),
  referenceNumber: z.string(),
  supplierId: z.string().nullable(),
  status: z.string(),
  expectedAt: z.iso.datetime().nullable(),
  receivedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInboundShipment = z.infer<typeof wmsInboundShipmentSchema>;

export const wmsInboundShipmentInsertSchema = wmsInboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInboundShipmentUpdateSchema =
  wmsInboundShipmentInsertSchema.partial();
