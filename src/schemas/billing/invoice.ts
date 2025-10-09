import { z } from 'zod';
import { BillingInvoiceStatusEnum } from '@/db/types';

// Zod schema for billing.invoice table
export const billingInvoiceSchema = z.object({
  id: z.uuid(),
  amountOutstanding: z.coerce
    .number()
    .min(0, { error: 'Amount outstanding must be at least 0' })
    .max(10000000, { error: 'Amount outstanding must be at most 10,000,000' })
    .optional()
    .nullable(),
  amountPaid: z.coerce
    .number()
    .min(0, { error: 'Amount paid must be at least 0' })
    .max(10000000, { error: 'Amount paid must be at most 10,000,000' })
    .optional()
    .nullable(),
  clientId: z.uuid(),
  createdAt: z.date().optional().nullable(),
  createdByUserId: z
    .string()
    .min(1, { error: 'Created by user ID is required' })
    .max(255, { error: 'Created by user ID must be at most 255 characters' })
    .optional()
    .nullable(),
  currency: z
    .string()
    .min(1, { error: 'Currency is required' })
    .max(8, { error: 'Currency must be at most 8 characters' })
    .optional()
    .nullable(),
  discountAmount: z.coerce
    .number()
    .min(0, { error: 'Discount amount must be at least 0' })
    .max(1000000, { error: 'Discount amount must be at most 1,000,000' })
    .optional()
    .nullable(),
  dueDate: z.date(),
  invoiceNumber: z
    .string()
    .min(1, { error: 'Invoice number is required' })
    .max(64, { error: 'Invoice number must be at most 64 characters' }),
  issueDate: z.date(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional()
    .nullable(),
  paidAt: z.date().optional().nullable(),
  paymentTerms: z
    .string()
    .min(1, { error: 'Payment terms are required' })
    .max(255, { error: 'Payment terms must be at most 255 characters' })
    .optional()
    .nullable(),
  quoteId: z.uuid().optional().nullable(),
  sentAt: z.date().optional().nullable(),
  status: z.enum(BillingInvoiceStatusEnum).optional().nullable(),
  subtotal: z.coerce
    .number()
    .min(0, { error: 'Subtotal must be at least 0' })
    .max(10000000, { error: 'Subtotal must be at most 10,000,000' })
    .optional()
    .nullable(),
  taxAmount: z.coerce
    .number()
    .min(0, { error: 'Tax amount must be at least 0' })
    .max(1000000, { error: 'Tax amount must be at most 1,000,000' })
    .optional()
    .nullable(),
  totalAmount: z.coerce
    .number()
    .min(0, { error: 'Total amount must be at least 0' })
    .max(10000000, { error: 'Total amount must be at most 10,000,000' }),
  updatedAt: z.date().optional().nullable(),
});

export type BillingInvoice = z.infer<typeof billingInvoiceSchema>;

export const billingInvoiceInsertSchema = billingInvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingInvoiceUpdateSchema = billingInvoiceInsertSchema.partial();
