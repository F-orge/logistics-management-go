import { z } from 'zod';
import { WmsStockTransferStatusEnum } from '@/db/types';

export const wmsStockTransferSchema = z.object({
  id: z.uuid(),
  sourceWarehouseId: z.uuid(),
  destinationWarehouseId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  status: z.enum(WmsStockTransferStatusEnum).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsStockTransfer = z.infer<typeof wmsStockTransferSchema>;

export const wmsStockTransferInsertSchema = wmsStockTransferSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsStockTransferUpdateSchema =
  wmsStockTransferInsertSchema.partial();
