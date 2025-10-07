import { z } from 'zod';

export const wmsBinThresholdSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  locationId: z.uuid({ message: 'Invalid UUID format for location ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  minQuantity: z
    .number({ message: 'Minimum quantity must be a number' })
    .int({ message: 'Minimum quantity must be an integer' })
    .min(0, { error: 'Minimum quantity must be at least 0' })
    .max(1000000, { error: 'Minimum quantity must be at most 1,000,000' })
    .optional(),
  maxQuantity: z
    .number({ message: 'Maximum quantity must be a number' })
    .int({ message: 'Maximum quantity must be an integer' })
    .min(0, { error: 'Maximum quantity must be at least 0' })
    .max(1000000, { error: 'Maximum quantity must be at most 1,000,000' }),
  alertThreshold: z
    .number({ message: 'Alert threshold must be a number' })
    .int({ message: 'Alert threshold must be an integer' })
    .min(0, { error: 'Alert threshold must be at least 0' })
    .max(1000000, { error: 'Alert threshold must be at most 1,000,000' })
    .optional()
    .optional(),
  reorderQuantity: z
    .number({ message: 'Reorder quantity must be a number' })
    .int({ message: 'Reorder quantity must be an integer' })
    .min(0, { error: 'Reorder quantity must be at least 0' })
    .max(1000000, { error: 'Reorder quantity must be at most 1,000,000' })
    .optional()
    .optional(),
  isActive: z
    .boolean({ message: 'Is active must be a boolean' })
    .optional()
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsBinThreshold = z.infer<typeof wmsBinThresholdSchema>;

export const wmsBinThresholdInsertSchema = wmsBinThresholdSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsBinThresholdUpdateSchema =
  wmsBinThresholdInsertSchema.partial();
