import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { imsProducts } from './products.sql';

export const productSchema = createSelectSchema(imsProducts, {
  barcode: z.string().max(64).optional().nullable(),
  costPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .optional()
    .nullable(),
  length: z.number().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
});

export const insertProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = insertProductSchema.partial();
