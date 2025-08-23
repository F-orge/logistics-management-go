/**
 * Generated Zod schema for crm_opportunity_products (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const opportunityProductsSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  opportunity: z.string(),
  product: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  updated: z.iso.datetime().optional(),
});

export type OpportunityProducts = z.infer<typeof opportunityProductsSchema>;
