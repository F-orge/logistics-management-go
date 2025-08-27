/**
 * Generated Zod schema for lms_pricing_zone_countries (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const pricingZoneCountriesSchema = z.object({
  country_code: z.string(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  pricing_zone: z.string(),
  updated: z.iso.datetime().optional(),
});

export type PricingZoneCountries = z.infer<typeof pricingZoneCountriesSchema>;
