import { z } from 'zod';
import { WmsTaskStatusEnum, WmsTaskTypeEnum } from '@/db/types';

export const wmsTaskSchema = z.object({
  id: z.uuid(),
  warehouseId: z.uuid(),
  taskNumber: z.string().min(1, { error: 'Task number is required' }).max(64, { error: 'Task number must be at most 64 characters' }),
  type: z.enum(WmsTaskTypeEnum),
  status: z.enum(WmsTaskStatusEnum).nullable(),
  userId: z.uuid().nullable().optional(),
  pickBatchId: z.uuid().nullable().optional(),
  priority: z.number().nullable().optional(),
  instructions: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  sourceEntityId: z.uuid().nullable().optional(),
  sourceEntityType: z.string().nullable().optional(),
  estimatedDuration: z.number().nullable().optional(),
  actualDuration: z.number().nullable().optional(),
  durationSeconds: z.number().nullable().optional(),
  startTime: z.iso.datetime().nullable().optional(),
  endTime: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsTask = z.infer<typeof wmsTaskSchema>;

export const wmsTaskInsertSchema = wmsTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsTaskUpdateSchema = wmsTaskInsertSchema.partial();
