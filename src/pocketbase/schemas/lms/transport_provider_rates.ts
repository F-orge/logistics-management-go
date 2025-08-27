/**
 * Generated Zod schema for lms_transport_provider_rates (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const transportProviderRatesSchema = z.object({
  base_rate: z.number().optional(),
  created: z.iso.datetime().optional(),
  currency: z.string(),
  destination_zones: z.string().optional(),
  effective_date: z.iso.datetime(),
  expiry_date: z.iso.datetime().optional(),
  fuel_surcharge_rate: z.number().optional(),
  id: z.string(),
  origin_zone: z.string().optional(),
  per_kg_rate: z.number().optional(),
  provider: z.string().optional(),
  updated: z.iso.datetime().optional(),
  weight_max: z.number().optional(),
  weight_min: z.number().optional(),
});

export type TransportProviderRates = z.infer<
  typeof transportProviderRatesSchema
>;
