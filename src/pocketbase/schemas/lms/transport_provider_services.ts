/**
 * Generated Zod schema for lms_transport_provider_services (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import {
  LmsTransportProviderServicesTransportModeOptions,
  LmsTransportProviderServicesTypeOptions,
} from '../../types';

export const transportProviderServicesSchema = z.object({
  created: z.iso.datetime().optional(),
  cutoff_time: z.iso.datetime().optional(),
  id: z.string(),
  insurance_available: z.boolean().optional(),
  is_active: z.boolean().optional(),
  max_weight: z.number().optional(),
  name: z.string().optional(),
  provider: z.string(),
  tracking_available: z.boolean().optional(),
  transit_time_max: z.number().optional(),
  transit_time_min: z.number().optional(),
  transport_mode: z.enum(LmsTransportProviderServicesTransportModeOptions),
  type: z.enum(LmsTransportProviderServicesTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type TransportProviderServices = z.infer<
  typeof transportProviderServicesSchema
>;
