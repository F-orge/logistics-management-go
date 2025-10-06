import { z } from 'zod';

export const wmsInventoryBatchSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  batchNumber: z
    .string()
    .min(1, { error: 'Batch number is required' })
    .max(64, { error: 'Batch number must be at most 64 characters' }),
  expirationDate: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInventoryBatch = z.infer<typeof wmsInventoryBatchSchema>;

export const wmsInventoryBatchInsertSchema = wmsInventoryBatchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsInventoryBatchUpdateSchema =
  wmsInventoryBatchInsertSchema.partial();
