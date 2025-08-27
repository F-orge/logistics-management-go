/**
 * Generated Zod schema for lms_transport_provider_service_max_dimensions (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const transportProviderServiceMaxDimensionsSchema = z.object({
  created: z.iso.datetime().optional(),
  height: z.number().optional(),
  id: z.string(),
  length: z.number().optional(),
  provider: z.string(),
  updated: z.iso.datetime().optional(),
  width: z.number().optional(),
});

export type TransportProviderServiceMaxDimensions = z.infer<
  typeof transportProviderServiceMaxDimensionsSchema
>;
