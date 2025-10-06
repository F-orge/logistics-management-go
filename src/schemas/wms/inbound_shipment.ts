import { z } from 'zod';
import { WmsInboundShipmentStatusEnum } from '@/db/types';

export const wmsInboundShipmentSchema = z.object({
  id: z.uuid(),
  clientId: z.string().uuid().nullable(),
  warehouseId: z.string().uuid(),
  status: z.enum(WmsInboundShipmentStatusEnum).nullable(),
  expectedArrivalDate: z.iso.datetime().nullable(),
  actualArrivalDate: z.iso.datetime().nullable(),
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
