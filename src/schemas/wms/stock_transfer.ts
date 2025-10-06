import { z } from 'zod';
import { WmsStockTransferStatusEnum } from '@/db/types';

export const wmsStockTransferSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  sourceWarehouseId: z.uuid({
    message: 'Invalid UUID format for source warehouse ID',
  }),
  destinationWarehouseId: z.uuid({
    message: 'Invalid UUID format for destination warehouse ID',
  }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantity: z.coerce
    .number({ message: 'Quantity must be a number' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  status: z
    .enum(WmsStockTransferStatusEnum, {
      message: 'Invalid stock transfer status',
    })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type WmsStockTransfer = z.infer<typeof wmsStockTransferSchema>;

export const wmsStockTransferInsertSchema = wmsStockTransferSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsStockTransferUpdateSchema =
  wmsStockTransferInsertSchema.partial();
