/**
 * Generated Zod schema for lms_transport_provider_performance (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { LmsTransportProviderPerformanceMetricTypeOptions } from "../../types";

export const transportProviderPerformanceSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  measurement_date: z.iso.datetime(),
  metric_type: z.enum(LmsTransportProviderPerformanceMetricTypeOptions),
  metric_value: z.number(),
  notes: z.string().optional(),
  provider: z.string(),
  shipment: z.string(),
  updated: z.iso.datetime().optional(),
});

export type TransportProviderPerformance = z.infer<
  typeof transportProviderPerformanceSchema
>;
