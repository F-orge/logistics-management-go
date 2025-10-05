import { z } from 'zod';

export const wmsReorderPointSchema = z.object({
  id: z.uuid(),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
  locationId: z
    .string()
    .min(1, { error: 'Location ID is required' })
    .max(255, { error: 'Location ID must be at most 255 characters' }),
  reorderLevel: z.coerce
    .number()
    .min(0, { error: 'Reorder level must be at least 0' })
    .max(1000000, { error: 'Reorder level must be at most 1,000,000' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsReorderPoint = z.infer<typeof wmsReorderPointSchema>;

export const wmsReorderPointInsertSchema = wmsReorderPointSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReorderPointUpdateSchema =
  wmsReorderPointInsertSchema.partial();
