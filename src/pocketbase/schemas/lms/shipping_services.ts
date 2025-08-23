/**
 * Generated Zod schema for lms_shipping_services (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { LmsShippingServicesTypeOptions } from "../../types";

export const shippingServicesSchema = z.object({
  created: z.iso.datetime().optional(),
  delivery_time_max: z.number(),
  delivery_time_min: z.number(),
  description: z.string().optional(),
  id: z.string(),
  is_active: z.boolean().optional(),
  max_weight: z.number().optional(),
  name: z.string(),
  type: z.enum(LmsShippingServicesTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type ShippingServices = z.infer<typeof shippingServicesSchema>;
