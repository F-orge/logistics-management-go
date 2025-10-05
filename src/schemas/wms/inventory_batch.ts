import { z } from 'zod';

export const wmsInventoryBatchSchema = z.object({
  id: z.string(),
  productId: z.string(),
  batchNumber: z.string(),
  quantity: z.coerce.number(),
  receivedAt: z.iso.datetime().nullable(),
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
