/**
 * Generated Zod schema for lms_pricing_zones (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const pricingZonesSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  name: z.string(),
  updated: z.iso.datetime().optional(),
  zone_code: z.string(),
});

export type PricingZones = z.infer<typeof pricingZonesSchema>;
