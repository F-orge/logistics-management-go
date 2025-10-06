import { z } from 'zod';
import { WmsPickBatchStatusEnum, WmsPickStrategyEnum } from '@/db/types';

export const wmsPickBatchSchema = z.object({
  id: z.uuid(),
  warehouseId: z.uuid(),
  batchNumber: z
    .string()
    .min(1, { error: 'Batch number is required' })
    .max(64, { error: 'Batch number must be at most 64 characters' }),
  status: z.enum(WmsPickBatchStatusEnum).nullable(),
  strategy: z.enum(WmsPickStrategyEnum),
  assignedUserId: z.uuid().nullable().optional(),
  priority: z.number().nullable().optional(),
  totalItems: z.number().nullable().optional(),
  completedItems: z.number().nullable().optional(),
  estimatedDuration: z.number().nullable().optional(),
  actualDuration: z.number().nullable().optional(),
  startedAt: z.iso.datetime().nullable().optional(),
  completedAt: z.iso.datetime().nullable().optional(),
  waveId: z.uuid().nullable().optional(),
  zoneRestrictions: z.array(z.string()).nullable().optional(),
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
