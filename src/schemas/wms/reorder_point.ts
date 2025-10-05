import { z } from 'zod';

export const wmsReorderPointSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  locationId: z.uuid(),
  reorderLevel: z.coerce.number(),
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
