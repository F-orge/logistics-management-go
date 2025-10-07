import { z } from 'zod';
import { WmsOutboundShipmentStatusEnum } from '@/db/types';

export const wmsOutboundShipmentSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  salesOrderId: z.uuid({ message: 'Invalid UUID format for sales order ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  status: z
    .enum(WmsOutboundShipmentStatusEnum, {
      message: 'Invalid outbound shipment status',
    })
    .optional(),
  carrier: z
    .string({ message: 'Carrier must be a string' })
    .min(1, { error: 'Carrier cannot be empty' })
    .max(255, { error: 'Carrier must be at most 255 characters' })
    .optional()
    .optional(),
  trackingNumber: z
    .string({ message: 'Tracking number must be a string' })
    .min(1, { error: 'Tracking number cannot be empty' })
    .max(255, { error: 'Tracking number must be at most 255 characters' })
    .optional()
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsOutboundShipment = z.infer<typeof wmsOutboundShipmentSchema>;

export const wmsOutboundShipmentInsertSchema = wmsOutboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsOutboundShipmentUpdateSchema =
  wmsOutboundShipmentInsertSchema.partial();
