import { z } from 'zod';
import { WmsInventoryAdjustmentReasonEnum } from '@/db/types';

export const wmsInventoryAdjustmentSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  userId: z.uuid({ message: 'Invalid UUID format for user ID' }),
  quantityChange: z.coerce
    .number({ message: 'Quantity change must be a number' })
    .int({ message: 'Quantity change must be an integer' })
    .min(-1000000, { error: 'Quantity change must be at least -1,000,000' })
    .max(1000000, { error: 'Quantity change must be at most 1,000,000' }),
  reason: z
    .enum(WmsInventoryAdjustmentReasonEnum, {
      message: 'Invalid inventory adjustment reason',
    })
    .optional(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional()
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsInventoryAdjustment = z.infer<
  typeof wmsInventoryAdjustmentSchema
>;

export const wmsInventoryAdjustmentInsertSchema =
  wmsInventoryAdjustmentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const wmsInventoryAdjustmentUpdateSchema =
  wmsInventoryAdjustmentInsertSchema.partial();
