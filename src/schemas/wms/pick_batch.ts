import { z } from 'zod';

export const wmsPickBatchSchema = z.object({
  id: z.string(),
  batchNumber: z.string(),
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsPickBatch = z.infer<typeof wmsPickBatchSchema>;

export const wmsPickBatchInsertSchema = wmsPickBatchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPickBatchUpdateSchema = wmsPickBatchInsertSchema.partial();
