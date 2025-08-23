/**
 * Generated Zod schema for lms_pricing_rates (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const pricingRatesSchema = z.object({
  base_rate: z.number(),
  created: z.iso.datetime().optional(),
  destination_zone: z.string(),
  effective_date: z.iso.datetime(),
  expiry_date: z.iso.datetime().optional(),
  fuel_surcharge_rate: z.number(),
  id: z.string(),
  origin_zone: z.string(),
  per_kg_rate: z.number(),
  shipping_service: z.string(),
  updated: z.iso.datetime().optional(),
  weight_max: z.number(),
  weight_min: z.number(),
});

export type PricingRates = z.infer<typeof pricingRatesSchema>;
