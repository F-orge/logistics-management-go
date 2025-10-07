import { z } from 'zod';

// Zod schema for billing.invoice_line_item table
export const billingInvoiceLineItemSchema = z.object({
  id: z.uuid(),
  createdAt: z.date().optional(),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(255, { error: 'Description must be at most 255 characters' }),
  discountAmount: z.coerce
    .number()
    .min(0, { error: 'Discount amount must be at least 0' })
    .max(1000000, { error: 'Discount amount must be at most 1,000,000' })
    .optional(),
  discountRate: z.coerce
    .number()
    .min(0, { error: 'Discount rate must be at least 0' })
    .max(100, { error: 'Discount rate must be at most 100' })
    .optional(),
  invoiceId: z.uuid(),
  lineTotal: z.coerce
    .number()
    .min(0, { error: 'Line total must be at least 0' })
    .max(10000000, { error: 'Line total must be at most 10,000,000' })
    .optional(),
  quantity: z.coerce
    .number()
    .min(1, { error: 'Quantity must be at least 1' })
    .max(100000, { error: 'Quantity must be at most 100,000' }),
  sourceRecordId: z.uuid().optional(),
  sourceRecordType: z
    .string()
    .min(1, { error: 'Source record type is required' })
    .max(64, { error: 'Source record type must be at most 64 characters' })
    .optional(),
  taxAmount: z.coerce
    .number()
    .min(0, { error: 'Tax amount must be at least 0' })
    .max(1000000, { error: 'Tax amount must be at most 1,000,000' })
    .optional(),
  taxRate: z.coerce
    .number()
    .min(0, { error: 'Tax rate must be at least 0' })
    .max(100, { error: 'Tax rate must be at most 100' })
    .optional(),
  totalPrice: z.coerce
    .number()
    .min(0, { error: 'Total price must be at least 0' })
    .max(10000000, { error: 'Total price must be at most 10,000,000' })
    .optional(),
  unitPrice: z.coerce
    .number()
    .min(0, { error: 'Unit price must be at least 0' })
    .max(1000000, { error: 'Unit price must be at most 1,000,000' }),
  updatedAt: z.date().optional(),
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
