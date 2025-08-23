/**
 * Generated Zod schema for crm_invoices (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { CrmInvoicesStatusOptions } from "../../types";

export const invoicesSchema = z.object({
  company: z.string(),
  contact: z.string().optional(),
  created: z.iso.datetime().optional(),
  currency: z.string(),
  due_date: z.iso.datetime(),
  id: z.string(),
  invoice_date: z.iso.datetime(),
  invoice_number: z.string(),
  payment_terms: z.string().optional(),
  status: z.enum(CrmInvoicesStatusOptions).optional(),
  subtotal: z.number(),
  tax_amount: z.number(),
  updated: z.iso.datetime().optional(),
});

export type Invoices = z.infer<typeof invoicesSchema>;
