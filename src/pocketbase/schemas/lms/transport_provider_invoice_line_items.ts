/**
 * Generated Zod schema for lms_transport_provider_invoice_line_items (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const transportProviderInvoiceLineItemsSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string(),
  id: z.string(),
  line_total: z.number().optional(),
  provider_invoice: z.string(),
  quantity: z.number().optional(),
  unit_price: z.number().optional(),
  updated: z.iso.datetime().optional(),
});

export type TransportProviderInvoiceLineItems = z.infer<
  typeof transportProviderInvoiceLineItemsSchema
>;
