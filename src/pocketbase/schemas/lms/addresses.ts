/**
 * Generated Zod schema for lms_addresses (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { LmsAddressesTypeOptions } from "../../types";

export const addressesSchema = z.object({
  address_line_1: z.string(),
  address_line_2: z.string(),
  city: z.string(),
  coordinates: z.object({
    lon: z.number(),
    lat: z.number(),
  }).optional(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  is_validated: z.boolean().optional(),
  postal_code: z.string(),
  state: z.string(),
  type: z.enum(LmsAddressesTypeOptions).optional(),
  updated: z.iso.datetime().optional(),
});

export type Addresses = z.infer<typeof addressesSchema>;
