import { z } from 'zod';
import { WmsTaskStatusEnum, WmsTaskTypeEnum } from '@/db/types';

export const wmsTaskSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  taskNumber: z
    .string({ message: 'Task number must be a string' })
    .min(1, { error: 'Task number is required' })
    .max(64, { error: 'Task number must be at most 64 characters' }),
  type: z.enum(WmsTaskTypeEnum, { message: 'Invalid task type' }),
  status: z
    .enum(WmsTaskStatusEnum, { message: 'Invalid task status' })
    .optional()
    .nullable(),
  userId: z.string().optional().nullable(),
  pickBatchId: z
    .uuid({ message: 'Invalid UUID format for pick batch ID' })
    .optional()
    .nullable(),
  priority: z
    .number({ message: 'Priority must be a number' })
    .int({ message: 'Priority must be an integer' })
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' })
    .optional()
    .nullable(),
  instructions: z
    .string({ message: 'Instructions must be a string' })
    .min(1, { error: 'Instructions cannot be empty' })
    .max(1024, { error: 'Instructions must be at most 1024 characters' })
    .optional()
    .nullable(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes cannot be empty' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional()
    .nullable(),
  sourceEntityId: z
    .uuid({ message: 'Invalid UUID format for source entity ID' })
    .optional()
    .nullable(),
  sourceEntityType: z
    .string({ message: 'Source entity type must be a string' })
    .min(1, { error: 'Source entity type cannot be empty' })
    .max(64, { error: 'Source entity type must be at most 64 characters' })
    .optional()
    .nullable(),
  estimatedDuration: z
    .number({ message: 'Estimated duration must be a number' })
    .int({ message: 'Estimated duration must be an integer' })
    .min(0, { error: 'Estimated duration must be at least 0' })
    .max(10000, { error: 'Estimated duration must be at most 10,000' })
    .optional()
    .nullable(),
  actualDuration: z
    .number({ message: 'Actual duration must be a number' })
    .int({ message: 'Actual duration must be an integer' })
    .min(0, { error: 'Actual duration must be at least 0' })
    .max(10000, { error: 'Actual duration must be at most 10,000' })
    .optional()
    .nullable(),
  durationSeconds: z
    .number({ message: 'Duration in seconds must be a number' })
    .int({ message: 'Duration in seconds must be an integer' })

    .max(1000000, { error: 'Duration in seconds must be at most 1,000,000' })
    .optional()
    .nullable(),
  startTime: z
    .date({ message: 'Invalid date format for start time' })
    .optional()
    .nullable(),
  endTime: z
    .date({ message: 'Invalid date format for end time' })
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type WmsTask = z.infer<typeof wmsTaskSchema>;

export const wmsTaskInsertSchema = wmsTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsTaskUpdateSchema = wmsTaskInsertSchema.partial();
