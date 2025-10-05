import { z } from 'zod';
import { WmsStockTransferStatusEnum } from '@/db/types';

export const wmsStockTransferSchema = z.object({
  id: z.uuid(),
  fromLocationId: z
    .string()
    .min(1, { error: 'From location ID is required' })
    .max(255, { error: 'From location ID must be at most 255 characters' }),
  toLocationId: z
    .string()
    .min(1, { error: 'To location ID is required' })
    .max(255, { error: 'To location ID must be at most 255 characters' }),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
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
