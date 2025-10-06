import { z } from 'zod';

export const wmsBinThresholdSchema = z.object({
  id: z.string().uuid(),
  locationId: z.string().min(1, { error: 'Location ID is required' }),
  productId: z.string().min(1, { error: 'Product ID is required' }),
  minQuantity: z
    .number()
    .min(0, { error: 'Minimum quantity must be at least 0' })
    .optional(),
  maxQuantity: z
    .number()
    .min(0, { error: 'Maximum quantity must be at least 0' }),
  alertThreshold: z.number().nullable().optional(),
  reorderQuantity: z.number().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsBinThreshold = z.infer<typeof wmsBinThresholdSchema>;

export const wmsBinThresholdInsertSchema = wmsBinThresholdSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsBinThresholdUpdateSchema =
  wmsBinThresholdInsertSchema.partial();
