import { z } from 'zod';
import { WmsInboundShipmentStatusEnum } from '@/db/types';

export const wmsInboundShipmentSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z
    .uuid({ message: 'Invalid UUID format for client ID' })
    .optional()
    .nullable(),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  status: z
    .enum(WmsInboundShipmentStatusEnum, {
      message: 'Invalid inbound shipment status',
    })
    .optional()
    .nullable(),
  expectedArrivalDate: z
    .date({ message: 'Invalid date format for expected arrival date' })
    .optional()
    .nullable(),
  actualArrivalDate: z
    .date({ message: 'Invalid date format for actual arrival date' })
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

export type WmsInboundShipment = z.infer<typeof wmsInboundShipmentSchema>;

export const wmsInboundShipmentInsertSchema = wmsInboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInboundShipmentUpdateSchema =
  wmsInboundShipmentInsertSchema.partial();
