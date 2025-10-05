import { z } from 'zod';
import { WmsPickBatchStatusEnum, WmsPickStrategyEnum } from '@/db/types';

export const wmsPickBatchSchema = z.object({
  id: z.uuid(),
  batchNumber: z
    .string()
    .min(1, { error: 'Batch number is required' })
    .max(64, { error: 'Batch number must be at most 64 characters' }),
  status: z.enum(WmsPickBatchStatusEnum).nullable(),
  strategy: z.enum(WmsPickStrategyEnum).nullable(),
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
