import { z } from 'zod';

export const wmsProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsProduct = z.infer<typeof wmsProductSchema>;

export const wmsProductInsertSchema = wmsProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsProductUpdateSchema = wmsProductInsertSchema.partial();
