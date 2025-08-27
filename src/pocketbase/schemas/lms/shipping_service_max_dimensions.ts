/**
 * Generated Zod schema for lms_shipping_service_max_dimensions (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const shippingServiceMaxDimensionsSchema = z.object({
  created: z.iso.datetime().optional(),
  height: z.number().optional(),
  id: z.string(),
  length: z.number().optional(),
  shipping_service: z.string(),
  updated: z.iso.datetime().optional(),
  width: z.number().optional(),
});

export type ShippingServiceMaxDimensions = z.infer<
  typeof shippingServiceMaxDimensionsSchema
>;
