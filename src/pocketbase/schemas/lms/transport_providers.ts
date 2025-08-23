/**
 * Generated Zod schema for lms_transport_providers (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { LmsTransportProvidersTypeOptions } from "../../types";

export const transportProvidersSchema = z.object({
  address: z.string().optional(),
  api_endpoint: z.string().optional(),
  api_key: z.string().optional(),
  company_name: z.string(),
  contact_person: z.string().optional(),
  contract_end_date: z.iso.datetime().optional(),
  contract_start_date: z.iso.datetime().optional(),
  created: z.iso.datetime().optional(),
  email: z.email().optional(),
  id: z.string(),
  insurance_coverage: z.number().optional(),
  is_active: z.boolean().optional(),
  payment_terms: z.string().optional(),
  performance_rating: z.number().optional(),
  phone_number: z.string().optional(),
  type: z.enum(LmsTransportProvidersTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type TransportProviders = z.infer<typeof transportProvidersSchema>;
