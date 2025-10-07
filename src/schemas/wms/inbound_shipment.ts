import { z } from 'zod';
import { WmsInboundShipmentStatusEnum } from '@/db/types';

export const wmsInboundShipmentSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }).optional(),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  status: z
    .enum(WmsInboundShipmentStatusEnum, {
      message: 'Invalid inbound shipment status',
    })
    .optional(),
  expectedArrivalDate: z
    .date({ message: 'Invalid date format for expected arrival date' })
    .optional(),
  actualArrivalDate: z
    .date({ message: 'Invalid date format for actual arrival date' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsInboundShipment = z.infer<typeof wmsInboundShipmentSchema>;

export const wmsInboundShipmentInsertSchema = wmsInboundShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInboundShipmentUpdateSchema =
  wmsInboundShipmentInsertSchema.partial();
