import { z } from 'zod';

export const wmsReorderPointSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  threshold: z.coerce
    .number({ message: 'Threshold must be a number' })
    .int({ message: 'Threshold must be an integer' })
    .min(0, { error: 'Threshold must be at least 0' })
    .max(1000000, { error: 'Threshold must be at most 1,000,000' }),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsReorderPoint = z.infer<typeof wmsReorderPointSchema>;

export const wmsReorderPointInsertSchema = wmsReorderPointSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReorderPointUpdateSchema =
  wmsReorderPointInsertSchema.partial();
