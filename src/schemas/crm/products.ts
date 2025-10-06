import { z } from 'zod';
import { CrmProductType } from '@/db/types';

export const crmProductSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Product name must be a string' })
    .min(1, { message: 'Product name is required' })
    .max(255, { message: 'Product name must be at most 255 characters' }),
  description: z
    .string({ message: 'Description must be a string' })
    .min(1, { message: 'Description is required' })
    .max(1024, { message: 'Description must be at most 1024 characters' })
    .nullable(),
  price: z.coerce
    .number({ message: 'Price must be a number' })
    .min(0, { message: 'Price must be at least 0' })
    .max(1000000, { message: 'Price must be at most 1,000,000' }),
  sku: z
    .string({ message: 'SKU must be a string' })
    .min(1, { message: 'SKU is required' })
    .max(127, { message: 'SKU must be at most 127 characters' })
    .nullable(),
  type: z.enum(CrmProductType, { message: 'Invalid product type' }).nullable(),
  createdAt: z.iso.datetime({ message: 'Invalid ISO datetime format for creation date' }).nullable(),
  updatedAt: z.iso.datetime({ message: 'Invalid ISO datetime format for update date' }).nullable(),
});

export type CrmProduct = z.infer<typeof crmProductSchema>;

export const crmProductInsertSchema = crmProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmProductUpdateSchema = crmProductInsertSchema.partial();
