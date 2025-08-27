/**
 * Generated Zod schema for lms_transport_provider_invoices (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { LmsTransportProviderInvoicesStatusOptions } from '../../types';

export const transportProviderInvoicesSchema = z.object({
  created: z.iso.datetime().optional(),
  currency: z.string(),
  due_date: z.iso.datetime(),
  id: z.string(),
  invoice_date: z.iso.datetime(),
  invoice_number: z.string(),
  payment_date: z.iso.datetime().optional(),
  provider: z.string().optional(),
  status: z.enum(LmsTransportProviderInvoicesStatusOptions).optional(),
  subtotal: z.number(),
  tax_amount: z.number(),
  total_amount: z.number().optional(),
  updated: z.iso.datetime().optional(),
});

export type TransportProviderInvoices = z.infer<
  typeof transportProviderInvoicesSchema
>;
