import { z } from 'zod';

export const wmsPackageItemSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsPackageItem = z.infer<typeof wmsPackageItemSchema>;

export const wmsPackageItemInsertSchema = wmsPackageItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPackageItemUpdateSchema = wmsPackageItemInsertSchema.partial();
