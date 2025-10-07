import { z } from 'zod';
import { WmsPickBatchStatusEnum, WmsPickStrategyEnum } from '@/db/types';

export const wmsPickBatchSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  batchNumber: z
    .string({ message: 'Batch number must be a string' })
    .min(1, { error: 'Batch number is required' })
    .max(64, { error: 'Batch number must be at most 64 characters' }),
  status: z
    .enum(WmsPickBatchStatusEnum, { message: 'Invalid pick batch status' })
    .optional(),
  strategy: z.enum(WmsPickStrategyEnum, { message: 'Invalid pick strategy' }),
  assignedUserId: z
    .uuid({ message: 'Invalid UUID format for assigned user ID' })
    .optional()
    .optional(),
  priority: z
    .number({ message: 'Priority must be a number' })
    .int({ message: 'Priority must be an integer' })
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' })
    .optional()
    .optional(),
  totalItems: z
    .number({ message: 'Total items must be a number' })
    .int({ message: 'Total items must be an integer' })
    .min(0, { error: 'Total items must be at least 0' })
    .max(100000, { error: 'Total items must be at most 100,000' })
    .optional()
    .optional(),
  completedItems: z
    .number({ message: 'Completed items must be a number' })
    .int({ message: 'Completed items must be an integer' })
    .min(0, { error: 'Completed items must be at least 0' })
    .max(100000, { error: 'Completed items must be at most 100,000' })
    .optional()
    .optional(),
  estimatedDuration: z
    .number({ message: 'Estimated duration must be a number' })
    .int({ message: 'Estimated duration must be an integer' })
    .min(0, { error: 'Estimated duration must be at least 0' })
    .max(10000, { error: 'Estimated duration must be at most 10,000' })
    .optional()
    .optional(),
  actualDuration: z
    .number({ message: 'Actual duration must be a number' })
    .int({ message: 'Actual duration must be an integer' })
    .min(0, { error: 'Actual duration must be at least 0' })
    .max(10000, { error: 'Actual duration must be at most 10,000' })
    .optional()
    .optional(),
  startedAt: z
    .date({ message: 'Invalid date format for started at' })
    .optional()
    .optional(),
  completedAt: z
    .date({ message: 'Invalid date format for completed at' })
    .optional()
    .optional(),
  waveId: z
    .uuid({ message: 'Invalid UUID format for wave ID' })
    .optional()
    .optional(),
  zoneRestrictions: z
    .array(
      z
        .string({ message: 'Zone restriction must be a string' })
        .min(1, { error: 'Zone restriction cannot be empty' })
        .max(64, { error: 'Zone restriction must be at most 64 characters' }),
    )
    .optional()
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsPickBatch = z.infer<typeof wmsPickBatchSchema>;

export const wmsPickBatchInsertSchema = wmsPickBatchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPickBatchUpdateSchema = wmsPickBatchInsertSchema.partial();
