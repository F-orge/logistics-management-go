import { z } from 'zod';

// Zod schema for billing.invoice_line_item table
export const billingInvoiceLineItemSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime().nullable(),
  description: z.string(),
  discountAmount: z.string().nullable(), // Numeric as string
  discountRate: z.string().nullable(), // Numeric as string
  invoiceId: z.string(),
  lineTotal: z.string().nullable(), // Numeric as string
  quantity: z.string(), // Numeric as string
  sourceRecordId: z.string().nullable(),
  sourceRecordType: z.string().nullable(),
  taxAmount: z.string().nullable(), // Numeric as string
  taxRate: z.string().nullable(), // Numeric as string
  totalPrice: z.string().nullable(), // Numeric as string
  unitPrice: z.string(), // Numeric as string
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingInvoiceLineItem = z.infer<
  typeof billingInvoiceLineItemSchema
>;

export const billingInvoiceLineItemInsertSchema =
  billingInvoiceLineItemSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const billingInvoiceLineItemUpdateSchema =
  billingInvoiceLineItemInsertSchema.partial();
