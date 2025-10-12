import { z } from 'zod';

// Zod schema for billing.invoice_line_item table
export const billingInvoiceLineItemSchema = z
  .object({
    id: z.uuid(),
    createdAt: z.date().optional().nullable(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .max(255, { message: 'Description must be at most 255 characters' }),
    discountAmount: z.coerce
      .number()
      .min(0, { message: 'Discount amount must be at least 0' })
      .max(1000000, { message: 'Discount amount must be at most 1,000,000' })
      .optional()
      .nullable(),
    discountRate: z.coerce
      .number()
      .min(0, { message: 'Discount rate must be at least 0' })
      .max(100, { message: 'Discount rate must be at most 100' })
      .optional()
      .nullable(),
    invoiceId: z.uuid(),
    lineTotal: z.coerce
      .number()
      .min(0, { message: 'Line total must be at least 0' })
      .max(10000000, { message: 'Line total must be at most 10,000,000' })
      .optional()
      .nullable(),
    quantity: z.coerce
      .number()
      .min(1, { message: 'Quantity must be at least 1' })
      .max(100000, { message: 'Quantity must be at most 100,000' }),
    sourceRecordId: z.uuid().optional().nullable(),
    sourceRecordType: z
      .string()
      .min(1, { message: 'Source record type is required' })
      .max(64, { message: 'Source record type must be at most 64 characters' })
      .optional()
      .nullable(),
    taxAmount: z.coerce
      .number()
      .min(0, { message: 'Tax amount must be at least 0' })
      .max(1000000, { message: 'Tax amount must be at most 1,000,000' })
      .optional()
      .nullable(),
    taxRate: z.coerce
      .number()
      .min(0, { message: 'Tax rate must be at least 0' })
      .max(100, { message: 'Tax rate must be at most 100' })
      .optional()
      .nullable(),
    totalPrice: z.coerce
      .number()
      .min(0, { message: 'Total price must be at least 0' })
      .max(10000000, { message: 'Total price must be at most 10,000,000' })
      .optional()
      .nullable(),
    unitPrice: z.coerce
      .number()
      .min(0, { message: 'Unit price must be at least 0' })
      .max(1000000, { message: 'Unit price must be at most 1,000,000' }),
    updatedAt: z.date().optional().nullable(),
  })
  .strict();

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
  billingInvoiceLineItemInsertSchema.partial().strict();
