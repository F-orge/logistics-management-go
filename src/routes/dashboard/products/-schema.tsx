import { z } from 'zod';

export const searchQuerySchema = z.object({
  productsPage: z.number().default(1),
  productsPerPage: z.number().default(10),
  id: z.string().optional(),
  newProduct: z.boolean().optional(),
  editProduct: z.boolean().optional(),
  deleteProduct: z.boolean().optional(),
});
