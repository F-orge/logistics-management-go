import { z } from 'zod';

export const wmsLocationSchema = z.object({
  id: z.string(),
  warehouseId: z.uuid(),
  name: z.string(),
  type: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsLocation = z.infer<typeof wmsLocationSchema>;

export const wmsLocationInsertSchema = wmsLocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsLocationUpdateSchema = wmsLocationInsertSchema.partial();
