import { z } from 'zod'

export const PackageItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  packageId: z.uuid({ message: 'Invalid UUID format for package ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantity: z.coerce
    .number({ message: 'Quantity must be a number' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  batchId: z
    .uuid({ message: 'Invalid UUID format for batch ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  expiryDate: z
    .date({ message: 'Invalid date format for expiry date' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  lotNumber: z
    .string({ message: 'Lot number must be a string' })
    .min(1, { error: 'Lot number cannot be empty' })
    .max(64, { error: 'Lot number must be at most 64 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  serialNumbers: z
    .array(
      z
        .string({ message: 'Serial number must be a string' })
        .min(1, { error: 'Serial number cannot be empty' })
        .max(255, { error: 'Serial number must be at most 255 characters' }),
    )
    .optional()
    .nullable()
    .optional()
    .nullable(),
  totalWeight: z.coerce
    .number({ message: 'Total weight must be a number' })
    .min(0, { error: 'Total weight must be at least 0' })
    .max(100000, { error: 'Total weight must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  unitWeight: z.coerce
    .number({ message: 'Unit weight must be a number' })
    .min(0, { error: 'Unit weight must be at least 0' })
    .max(100000, { error: 'Unit weight must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type WmsPackageItem = z.infer<typeof PackageItemSchema>

export const PackageItemInsertSchema = PackageItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const PackageItemUpdateSchema = PackageItemInsertSchema.partial()
