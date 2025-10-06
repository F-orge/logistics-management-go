import { z } from 'zod';
import { WmsOutboundShipmentStatusEnum } from '@/db/types';

export const wmsOutboundShipmentSchema = z.object({
  id: z.uuid(),
  salesOrderId: z.uuid(),
  warehouseId: z.uuid(),
  status: z.enum(WmsOutboundShipmentStatusEnum).nullable(),
  carrier: z.string().nullable().optional(),
  trackingNumber: z.string().nullable().optional(),
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
