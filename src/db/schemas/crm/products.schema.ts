import { createSelectSchema } from 'drizzle-zod';
import { products } from './products.sql';

export const productSchema = createSelectSchema(products, {});

export const insertProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = insertProductSchema.partial();
