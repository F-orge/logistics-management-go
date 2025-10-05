import { z } from 'zod';
import { WmsInboundShipmentStatusEnum } from '@/db/types';

export const wmsInboundShipmentSchema = z.object({
  id: z.uuid(),
  referenceNumber: z
    .string()
    .min(1, { error: 'Reference number is required' })
    .max(64, { error: 'Reference number must be at most 64 characters' }),
  supplierId: z
    .string()
    .min(1, { error: 'Supplier ID is required' })
    .max(255, { error: 'Supplier ID must be at most 255 characters' })
    .nullable(),
  status: z.enum(WmsInboundShipmentStatusEnum).nullable(),
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
