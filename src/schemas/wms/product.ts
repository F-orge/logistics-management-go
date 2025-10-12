import { z } from 'zod';
import { WmsProductStatusEnum } from '@/db/types';

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
  status: z
    .enum(WmsProductStatusEnum, { message: 'Invalid product status' })
    .optional()
    .nullable(),
  barcode: z
    .string({ message: 'Barcode must be a string' })
    .min(1, { error: 'Barcode cannot be empty' })
    .max(255, { error: 'Barcode must be at most 255 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  clientId: z
    .uuid({ message: 'Invalid UUID format for client ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  costPrice: z.coerce
    .number({ message: 'Cost price must be a number' })
    .min(0, { error: 'Cost price must be at least 0' })
    .max(10000000, { error: 'Cost price must be at most 10,000,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  description: z
    .string({ message: 'Description must be a string' })
    .min(1, { error: 'Description cannot be empty' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  height: z
    .number({ message: 'Height must be a number' })
    .min(0, { error: 'Height must be at least 0' })
    .max(10000, { error: 'Height must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  length: z
    .number({ message: 'Length must be a number' })
    .min(0, { error: 'Length must be at least 0' })
    .max(10000, { error: 'Length must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  supplierId: z
    .uuid({ message: 'Invalid UUID format for supplier ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  volume: z
    .number({ message: 'Volume must be a number' })
    .min(0, { error: 'Volume must be at least 0' })
    .max(100000, { error: 'Volume must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  weight: z
    .number({ message: 'Weight must be a number' })
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  width: z
    .number({ message: 'Width must be a number' })
    .min(0, { error: 'Width must be at least 0' })
    .max(10000, { error: 'Width must be at most 10,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type WmsProduct = z.infer<typeof wmsProductSchema>;

export const wmsProductInsertSchema = wmsProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsProductUpdateSchema = wmsProductInsertSchema.partial();
