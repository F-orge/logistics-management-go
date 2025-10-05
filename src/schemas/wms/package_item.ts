import { z } from 'zod';

export const wmsPackageItemSchema = z.object({
  id: z.uuid(),
  packageId: z.uuid(),
  productId: z.uuid(),
  quantity: z
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
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
