/**
 * Generated Zod schema for crm_invoice_line_items (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const invoiceLineItemsSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  id: z.string(),
  invoice: z.string().optional(),
  line_total: z.number().optional(),
  quantity: z.number(),
  shipment: z.string().optional(),
  unit_price: z.number().optional(),
  updated: z.iso.datetime().optional(),
});

export type InvoiceLineItems = z.infer<typeof invoiceLineItemsSchema>;
