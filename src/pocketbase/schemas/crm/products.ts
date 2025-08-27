/**
 * Generated Zod schema for crm_products (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const productsSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  id: z.string(),
  name: z.string(),
  price: z.number().optional(),
  sku: z.string().optional(),
  updated: z.iso.datetime().optional(),
});

export type Products = z.infer<typeof productsSchema>;
