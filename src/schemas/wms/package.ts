import { z } from 'zod';

export const wmsPackageSchema = z.object({
  id: z.uuid(),
  shipmentId: z.uuid(),
  trackingNumber: z
    .string()
    .min(1, { error: 'Tracking number is required' })
    .max(64, { error: 'Tracking number must be at most 64 characters' }),
  weight: z
    .number()
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' }),
  status: z
    .string()
    .min(1, { error: 'Status is required' })
    .max(32, { error: 'Status must be at most 32 characters' }),
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
