/**
 * Generated Zod schema for lms_shipments (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import {
  LmsShipmentsPrimaryTransportModeOptions,
  LmsShipmentsStatusOptions,
} from '../../types';

export const shipmentsSchema = z.object({
  created: z.iso.datetime().optional(),
  created_by: z.string(),
  currency: z.string(),
  delivery_date: z.iso.datetime().optional(),
  estimated_delivery_date: z.iso.datetime().optional(),
  id: z.string(),
  insurance_amount: z.number().optional(),
  pickup_date: z.iso.datetime().optional(),
  primary_transport_mode: z.enum(LmsShipmentsPrimaryTransportModeOptions),
  receiver_address: z.string(),
  receiver_company: z.string().optional(),
  receiver_contact: z.string().optional(),
  sender_address: z.string(),
  sender_company: z.string().optional(),
  sender_contact: z.string().optional(),
  shipping_cost: z.number().optional(),
  shipping_service: z.string(),
  special_instructions: z.string().optional(),
  status: z.enum(LmsShipmentsStatusOptions),
  total_value: z.number().optional(),
  total_weight: z.number(),
  tracking_number: z.string(),
  updated: z.iso.datetime().optional(),
});

export type Shipments = z.infer<typeof shipmentsSchema>;
