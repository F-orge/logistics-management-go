import { z } from 'zod';

export const wmsPackageSchema = z.object({
  id: z.uuid(),
  salesOrderId: z.uuid(),
  warehouseId: z.uuid(),
  packageNumber: z
    .string()
    .min(1, { error: 'Package number is required' })
    .max(64, { error: 'Package number must be at most 64 characters' }),
  trackingNumber: z
    .string()
    .nullable()
    .optional(),
  carrier: z.string().nullable().optional(),
  serviceLevel: z.string().nullable().optional(),
  packageType: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
  length: z.number().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  volume: z.number().nullable().optional(),
  insuranceValue: z.number().nullable().optional(),
  isFragile: z.boolean().nullable().optional(),
  isHazmat: z.boolean().nullable().optional(),
  requiresSignature: z.boolean().nullable().optional(),
  packedAt: z.iso.datetime().nullable().optional(),
  packedByUserId: z.uuid().nullable().optional(),
  shippedAt: z.iso.datetime().nullable().optional(),
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
