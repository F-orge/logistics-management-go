import { z } from 'zod'

export const PackageSchema = z.object({
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
    .nullable()
    .optional(),
  carrier: z
    .string({ message: 'Carrier must be a string' })
    .min(1, { error: 'Carrier cannot be empty' })
    .max(255, { error: 'Carrier must be at most 255 characters' })
    .nullable()
    .optional(),
  serviceLevel: z
    .string({ message: 'Service level must be a string' })
    .min(1, { error: 'Service level cannot be empty' })
    .max(64, { error: 'Service level must be at most 64 characters' })
    .nullable()
    .optional(),
  packageType: z
    .string({ message: 'Package type must be a string' })
    .min(1, { error: 'Package type cannot be empty' })
    .max(64, { error: 'Package type must be at most 64 characters' })
    .nullable()
    .optional(),
  weight: z.coerce
    .number({ message: 'Weight must be a number' })
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' })
    .nullable()
    .optional(),
  length: z.coerce
    .number({ message: 'Length must be a number' })
    .min(0, { error: 'Length must be at least 0' })
    .max(10000, { error: 'Length must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  width: z.coerce
    .number({ message: 'Width must be a number' })
    .min(0, { error: 'Width must be at least 0' })
    .max(10000, { error: 'Width must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  height: z.coerce
    .number({ message: 'Height must be a number' })
    .min(0, { error: 'Height must be at least 0' })
    .max(10000, { error: 'Height must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  volume: z.coerce
    .number({ message: 'Volume must be a number' })
    .min(0, { error: 'Volume must be at least 0' })
    .max(100000, { error: 'Volume must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  insuranceValue: z.coerce
    .number({ message: 'Insurance value must be a number' })
    .min(0, { error: 'Insurance value must be at least 0' })
    .max(10000000, { error: 'Insurance value must be at most 10,000,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isFragile: z
    .boolean({ message: 'Is fragile must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isHazmat: z
    .boolean({ message: 'Is hazmat must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  requiresSignature: z
    .boolean({ message: 'Requires signature must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  packedAt: z
    .date({ message: 'Invalid date format for packed at' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  packedByUserId: z
    .uuid({ message: 'Invalid UUID format for packed by user ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  shippedAt: z
    .date({ message: 'Invalid date format for shipped at' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type WmsPackage = z.infer<typeof PackageSchema>

export const PackageInsertSchema = PackageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const PackageUpdateSchema = PackageInsertSchema.partial()
