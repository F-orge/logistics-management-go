import { z } from 'zod';
import { WmsOutboundShipmentStatusEnum } from '@/db/types';

export const wmsOutboundShipmentSchema = z.object({
  id: z.uuid(),
  referenceNumber: z
    .string()
    .min(1, { error: 'Reference number is required' })
    .max(64, { error: 'Reference number must be at most 64 characters' }),
  status: z.enum(WmsOutboundShipmentStatusEnum).nullable(),
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
