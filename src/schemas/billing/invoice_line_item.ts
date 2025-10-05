import { z } from 'zod';

// Zod schema for billing.invoice_line_item table
export const billingInvoiceLineItemSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime().nullable(),
  description: z.string(),
  discountAmount: z.coerce.number().nullable(),
  discountRate: z.coerce.number().nullable(),
  invoiceId: z.uuid(),
  lineTotal: z.coerce.number().nullable(),
  quantity: z.coerce.number(),
  sourceRecordId: z.uuid().nullable(),
  sourceRecordType: z.string().nullable(),
  taxAmount: z.coerce.number().nullable(),
  taxRate: z.coerce.number().nullable(),
  totalPrice: z.coerce.number().nullable(),
  unitPrice: z.coerce.number(),
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
