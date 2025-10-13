import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';
import { CrmProductType } from '@/db/types';

export const crmProductSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Product name must be a string' })
      .min(1, { message: 'Product name is required' })
      .max(255, { message: 'Product name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Product Name',
          description: 'The name of the product.',
        }),
      ),
    description: z
      .string({ message: 'Description must be a string' })
      .min(1, { message: 'Description is required' })
      .max(1024, { message: 'Description must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Description',
          description: 'A detailed description of the product.',
        }),
      )
      .optional()
      .nullable(),
    price: z.coerce
      .number({ message: 'Price must be a number' })
      .min(0, { message: 'Price must be at least 0' })
      .max(1000000, { message: 'Price must be at most 1,000,000' })
      .check(
        fieldConfig({
          label: 'Price',
          description: 'The price of the product.',
        }),
      ),
    sku: z
      .string({ message: 'SKU must be a string' })
      .min(1, { message: 'SKU is required' })
      .max(127, { message: 'SKU must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'SKU',
          description: 'The Stock Keeping Unit for the product.',
        }),
      )
      .optional()
      .nullable(),
    type: z
      .enum(CrmProductType, { message: 'Invalid product type' })
      .check(
        fieldConfig({
          label: 'Type',
          description: 'The type of product (e.g., Good, Service).'
        }),
      )
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict();

export type CrmProduct = z.infer<typeof crmProductSchema>;

export const crmProductInsertSchema = crmProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmProductUpdateSchema = crmProductInsertSchema.partial();
