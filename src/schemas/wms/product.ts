import { z } from 'zod'
import { WmsProductStatusEnum } from '@/db/types'

export const wmsProductSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  sku: z
    .string({ message: 'SKU must be a string' })
    .min(1, { error: 'SKU is required' })
    .max(64, { error: 'SKU must be at most 64 characters' }),
  status: z.enum(WmsProductStatusEnum, { message: 'Invalid product status' }).nullable().optional(),
  barcode: z
    .string({ message: 'Barcode must be a string' })
    .min(1, { error: 'Barcode cannot be empty' })
    .max(255, { error: 'Barcode must be at most 255 characters' })
    .nullable()
    .optional(),
  clientId: z.uuid({ message: 'Invalid UUID format for client ID' }).nullable().optional(),
  costPrice: z.coerce
    .number({ message: 'Cost price must be a number' })
    .min(0, { error: 'Cost price must be at least 0' })
    .max(10000000, { error: 'Cost price must be at most 10,000,000' })
    .nullable()
    .optional(),
  description: z
    .string({ message: 'Description must be a string' })
    .min(1, { error: 'Description cannot be empty' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .nullable()
    .optional(),
  height: z.coerce
    .number({ message: 'Height must be a number' })
    .min(0, { error: 'Height must be at least 0' })
    .max(10000, { error: 'Height must be at most 10,000' })
    .nullable()
    .optional(),
  length: z.coerce
    .number({ message: 'Length must be a number' })
    .min(0, { error: 'Length must be at least 0' })
    .max(10000, { error: 'Length must be at most 10,000' })
    .nullable()
    .optional(),
  supplierId: z.uuid({ message: 'Invalid UUID format for supplier ID' }).nullable().optional(),
  volume: z.coerce
    .number({ message: 'Volume must be a number' })
    .min(0, { error: 'Volume must be at least 0' })
    .max(100000, { error: 'Volume must be at most 100,000' })
    .nullable()
    .optional(),
  weight: z.coerce
    .number({ message: 'Weight must be a number' })
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' })
    .nullable()
    .optional(),
  width: z.coerce
    .number({ message: 'Width must be a number' })
    .min(0, { error: 'Width must be at least 0' })
    .max(10000, { error: 'Width must be at most 10,000' })
    .nullable()
    .optional(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional(),
})

export type WmsProduct = z.infer<typeof wmsProductSchema>

// Schema for creating new products (excludes auto-generated fields)
export const wmsProductInsertSchema = wmsProductSchema.omit({
  id: true,
  volume: true, // Auto-calculated field
  createdAt: true,
  updatedAt: true,
})

// Schema for updating products (all fields optional except required business keys)
export const wmsProductUpdateSchema = wmsProductInsertSchema.partial().extend({
  sku: z.string().optional(), // Allow SKU updates but make optional
})

// Schema for API responses (includes all fields)
export const wmsProductResponseSchema = wmsProductSchema

// Schema for product search/filtering
export const wmsProductSearchSchema = z.object({
  sku: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(WmsProductStatusEnum).optional(),
  clientId: z.uuid().optional(),
  supplierId: z.uuid().optional(),
})

// Type exports
export type WmsProductInsert = z.infer<typeof wmsProductInsertSchema>
export type WmsProductUpdate = z.infer<typeof wmsProductUpdateSchema>
export type WmsProductResponse = z.infer<typeof wmsProductResponseSchema>
export type WmsProductSearch = z.infer<typeof wmsProductSearchSchema>
