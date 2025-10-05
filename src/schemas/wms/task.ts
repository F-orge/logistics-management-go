import { z } from 'zod';
import { WmsTaskStatusEnum, WmsTaskTypeEnum } from '@/db/types';

export const wmsTaskSchema = z.object({
  id: z.uuid(),
  assignedTo: z
    .string()
    .min(1, { error: 'Assigned to is required' })
    .max(255, { error: 'Assigned to must be at most 255 characters' })
    .nullable(),
  status: z.enum(WmsTaskStatusEnum).nullable(),
  type: z.enum(WmsTaskTypeEnum).nullable(),
  dueAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
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
