import { z } from 'zod';

export const wmsReorderPointSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  warehouseId: z.uuid(),
  threshold: z.coerce
    .number()
    .min(0, { error: 'Threshold must be at least 0' })
    .max(1000000, { error: 'Threshold must be at most 1,000,000' }),
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
