import { z } from 'zod'
import { WmsTaskStatusEnum, WmsTaskTypeEnum } from '../../db.types'

export const TaskSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  taskNumber: z
    .string({ message: 'Task number must be a string' })
    .min(1, { error: 'Task number is required' })
    .max(64, { error: 'Task number must be at most 64 characters' }),
  type: z.enum(WmsTaskTypeEnum, { message: 'Invalid task type' }),
  status: z.enum(WmsTaskStatusEnum, { message: 'Invalid task status' }).nullable().optional(),
  userId: z.string().nullable().optional(),
  pickBatchId: z.uuid({ message: 'Invalid UUID format for pick batch ID' }).nullable().optional(),
  priority: z
    .number({ message: 'Priority must be a number' })
    .int({ message: 'Priority must be an integer' })
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' })
    .nullable()
    .optional(),
  instructions: z
    .string({ message: 'Instructions must be a string' })
    .min(1, { error: 'Instructions cannot be empty' })
    .max(1024, { error: 'Instructions must be at most 1024 characters' })
    .nullable()
    .optional(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes cannot be empty' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable()
    .optional(),
  sourceEntityId: z
    .uuid({ message: 'Invalid UUID format for source entity ID' })
    .nullable()
    .optional(),
  sourceEntityType: z
    .string({ message: 'Source entity type must be a string' })
    .min(1, { error: 'Source entity type cannot be empty' })
    .max(64, { error: 'Source entity type must be at most 64 characters' })
    .nullable()
    .optional(),
  estimatedDuration: z
    .number({ message: 'Estimated duration must be a number' })
    .int({ message: 'Estimated duration must be an integer' })
    .min(0, { error: 'Estimated duration must be at least 0' })
    .max(10000, { error: 'Estimated duration must be at most 10,000' })
    .nullable()
    .optional(),
  actualDuration: z
    .number({ message: 'Actual duration must be a number' })
    .int({ message: 'Actual duration must be an integer' })
    .min(0, { error: 'Actual duration must be at least 0' })
    .max(10000, { error: 'Actual duration must be at most 10,000' })
    .nullable()
    .optional(),
  durationSeconds: z
    .number({ message: 'Duration in seconds must be a number' })
    .int({ message: 'Duration in seconds must be an integer' })
    .max(1000000, { error: 'Duration in seconds must be at most 1,000,000' })
    .nullable()
    .optional(),
  startTime: z.date({ message: 'Invalid date format for start time' }).nullable().optional(),
  endTime: z.date({ message: 'Invalid date format for end time' }).nullable().optional(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional(),
})

export type WmsTask = z.infer<typeof TaskSchema>

export const TaskInsertSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const TaskUpdateSchema = TaskInsertSchema.partial()
