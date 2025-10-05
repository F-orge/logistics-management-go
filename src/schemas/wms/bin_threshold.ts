import { z } from 'zod';

export const wmsBinThresholdSchema = z.object({
  id: z.uuid(),
  binId: z
    .string()
    .min(1, { error: 'Bin ID is required' })
    .max(255, { error: 'Bin ID must be at most 255 characters' }),
  minQuantity: z
    .number()
    .min(0, { error: 'Minimum quantity must be at least 0' })
    .max(1000000, { error: 'Minimum quantity must be at most 1,000,000' }),
  maxQuantity: z
    .number()
    .min(0, { error: 'Maximum quantity must be at least 0' })
    .max(1000000, { error: 'Maximum quantity must be at most 1,000,000' }),
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
