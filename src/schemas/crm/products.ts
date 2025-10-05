import { z } from 'zod';
import { CrmProductType } from '@/db/types';

export const crmProductSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Product name is required' })
    .max(255, { error: 'Product name must be at most 255 characters' }),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .nullable(),
  price: z.coerce
    .number()
    .min(0, { error: 'Price must be at least 0' })
    .max(1000000, { error: 'Price must be at most 1,000,000' }),
  sku: z
    .string()
    .min(1, { error: 'SKU is required' })
    .max(127, { error: 'SKU must be at most 127 characters' })
    .nullable(),
  type: z.enum(CrmProductType).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmProduct = z.infer<typeof crmProductSchema>;

export const crmProductInsertSchema = crmProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmProductUpdateSchema = crmProductInsertSchema.partial();
