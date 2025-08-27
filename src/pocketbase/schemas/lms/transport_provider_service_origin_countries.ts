/**
 * Generated Zod schema for lms_transport_provider_service_origin_countries (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const transportProviderServiceOriginCountriesSchema = z.object({
  country_code: z.string(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  provider: z.string(),
  updated: z.iso.datetime().optional(),
});

export type TransportProviderServiceOriginCountries = z.infer<
  typeof transportProviderServiceOriginCountriesSchema
>;
