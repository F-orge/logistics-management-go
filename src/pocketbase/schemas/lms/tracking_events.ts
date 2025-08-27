/**
 * Generated Zod schema for lms_tracking_events (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { LmsTrackingEventsTypeOptions } from '../../types';

export const trackingEventsSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  id: z.string(),
  location: z
    .object({
      lon: z.number(),
      lat: z.number(),
    })
    .optional(),
  shipment: z.string(),
  type: z.enum(LmsTrackingEventsTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type TrackingEvents = z.infer<typeof trackingEventsSchema>;
