import { z } from 'zod';

export const wmsPackageSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  salesOrderId: z.uuid({ message: 'Invalid UUID format for sales order ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  packageNumber: z
    .string({ message: 'Package number must be a string' })
    .min(1, { error: 'Package number is required' })
    .max(64, { error: 'Package number must be at most 64 characters' }),
  trackingNumber: z
    .string({ message: 'Tracking number must be a string' })
    .min(1, { error: 'Tracking number cannot be empty' })
    .max(255, { error: 'Tracking number must be at most 255 characters' })
    .optional()
    .optional(),
  carrier: z
    .string({ message: 'Carrier must be a string' })
    .min(1, { error: 'Carrier cannot be empty' })
    .max(255, { error: 'Carrier must be at most 255 characters' })
    .optional()
    .optional(),
  serviceLevel: z
    .string({ message: 'Service level must be a string' })
    .min(1, { error: 'Service level cannot be empty' })
    .max(64, { error: 'Service level must be at most 64 characters' })
    .optional()
    .optional(),
  packageType: z
    .string({ message: 'Package type must be a string' })
    .min(1, { error: 'Package type cannot be empty' })
    .max(64, { error: 'Package type must be at most 64 characters' })
    .optional()
    .optional(),
  weight: z
    .number({ message: 'Weight must be a number' })
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' })
    .optional()
    .optional(),
  length: z
    .number({ message: 'Length must be a number' })
    .min(0, { error: 'Length must be at least 0' })
    .max(10000, { error: 'Length must be at most 10,000' })
    .optional()
    .optional(),
  width: z
    .number({ message: 'Width must be a number' })
    .min(0, { error: 'Width must be at least 0' })
    .max(10000, { error: 'Width must be at most 10,000' })
    .optional()
    .optional(),
  height: z
    .number({ message: 'Height must be a number' })
    .min(0, { error: 'Height must be at least 0' })
    .max(10000, { error: 'Height must be at most 10,000' })
    .optional()
    .optional(),
  volume: z
    .number({ message: 'Volume must be a number' })
    .min(0, { error: 'Volume must be at least 0' })
    .max(100000, { error: 'Volume must be at most 100,000' })
    .optional()
    .optional(),
  insuranceValue: z
    .number({ message: 'Insurance value must be a number' })
    .min(0, { error: 'Insurance value must be at least 0' })
    .max(10000000, { error: 'Insurance value must be at most 10,000,000' })
    .optional()
    .optional(),
  isFragile: z
    .boolean({ message: 'Is fragile must be a boolean' })
    .optional()
    .optional(),
  isHazmat: z
    .boolean({ message: 'Is hazmat must be a boolean' })
    .optional()
    .optional(),
  requiresSignature: z
    .boolean({ message: 'Requires signature must be a boolean' })
    .optional()
    .optional(),
  packedAt: z
    .date({ message: 'Invalid date format for packed at' })
    .optional()
    .optional(),
  packedByUserId: z
    .uuid({ message: 'Invalid UUID format for packed by user ID' })
    .optional()
    .optional(),
  shippedAt: z
    .date({ message: 'Invalid date format for shipped at' })
    .optional()
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type WmsPackage = z.infer<typeof wmsPackageSchema>;

export const wmsPackageInsertSchema = wmsPackageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPackageUpdateSchema = wmsPackageInsertSchema.partial();
