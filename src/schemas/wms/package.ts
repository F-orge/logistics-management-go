import { z } from 'zod';

export const wmsPackageSchema = z.object({
  id: z.uuid(),
  shipmentId: z.uuid(),
  trackingNumber: z.string(),
  weight: z.coerce.number(),
  status: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsPackage = z.infer<typeof wmsPackageSchema>;

export const wmsPackageInsertSchema = wmsPackageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPackageUpdateSchema = wmsPackageInsertSchema.partial();
