import { z } from 'zod';
import { WmsTaskItemStatusEnum } from '@/db/types';

export const wmsTaskItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  taskId: z.uuid({ message: 'Invalid UUID format for task ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantityRequired: z.coerce
    .number({ message: 'Quantity required must be a number' })
    .int({ message: 'Quantity required must be an integer' })
    .min(0, { error: 'Quantity required must be at least 0' })
    .max(1000000, { error: 'Quantity required must be at most 1,000,000' }),
  quantityCompleted: z.coerce
    .number({ message: 'Quantity completed must be a number' })
    .int({ message: 'Quantity completed must be an integer' })
    .min(0, { error: 'Quantity completed must be at least 0' })
    .max(1000000, { error: 'Quantity completed must be at most 1,000,000' })
    .nullable()
    .optional(),
  quantityRemaining: z.coerce
    .number({ message: 'Quantity remaining must be a number' })
    .int({ message: 'Quantity remaining must be an integer' })
    .min(-1000000, { error: 'Quantity remaining must be at least -1,000,000' })
    .max(1000000, { error: 'Quantity remaining must be at most 1,000,000' })
    .nullable()
    .optional(),
  status: z
    .enum(WmsTaskItemStatusEnum, { message: 'Invalid task item status' })
    .optional()
    .nullable(),
  batchId: z
    .uuid({ message: 'Invalid UUID format for batch ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  completedAt: z
    .date({ message: 'Invalid date format for completed at' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  destinationLocationId: z
    .uuid({ message: 'Invalid UUID format for destination location ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  expiryDate: z
    .date({ message: 'Invalid date format for expiry date' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  lotNumber: z
    .string({ message: 'Lot number must be a string' })
    .min(1, { error: 'Lot number cannot be empty' })
    .max(64, { error: 'Lot number must be at most 64 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes cannot be empty' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  serialNumbers: z
    .array(
      z
        .string({ message: 'Serial number must be a string' })
        .min(1, { error: 'Serial number cannot be empty' })
        .max(255, { error: 'Serial number must be at most 255 characters' }),
    )
    .optional()
    .nullable()
    .optional()
    .nullable(),
  sourceLocationId: z
    .uuid({ message: 'Invalid UUID format for source location ID' })
    .optional()
    .nullable()
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

export type WmsTaskItem = z.infer<typeof wmsTaskItemSchema>;

export const wmsTaskItemInsertSchema = wmsTaskItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsTaskItemUpdateSchema = wmsTaskItemInsertSchema.partial();
