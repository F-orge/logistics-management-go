import { z } from 'zod';
import { WmsInventoryStockStatusEnum } from '@/db/types';

export const wmsInventoryStockSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  locationId: z.uuid(),
  quantity: z
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' })
    .optional(),
  reservedQuantity: z
    .number()
    .min(0, { error: 'Reserved quantity must be at least 0' })
    .max(1000000, { error: 'Reserved quantity must be at most 1,000,000' })
    .optional(),
  availableQuantity: z
    .number()
    .min(0, { error: 'Available quantity must be at least 0' })
    .max(1000000, { error: 'Available quantity must be at most 1,000,000' })
    .nullable()
    .optional(),
  batchId: z.uuid().nullable().optional(),
  status: z.enum(WmsInventoryStockStatusEnum).nullable(),
  lastCountedAt: z.iso.datetime().nullable().optional(),
  lastMovementAt: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInventoryStock = z.infer<typeof wmsInventoryStockSchema>;

export const wmsInventoryStockInsertSchema = wmsInventoryStockSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInventoryStockUpdateSchema =
  wmsInventoryStockInsertSchema.partial();
