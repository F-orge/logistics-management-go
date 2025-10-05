import { z } from 'zod';
import { BillingInvoiceStatusEnum } from '@/db/types';

// Zod schema for billing.invoice table
export const billingInvoiceSchema = z.object({
  id: z.string(),
  amountOutstanding: z.string().nullable(), // Numeric as string
  amountPaid: z.string().nullable(), // Numeric as string
  clientId: z.string(),
  createdAt: z.iso.datetime().nullable(),
  createdByUserId: z.string().nullable(),
  currency: z.string().nullable(),
  discountAmount: z.string().nullable(), // Numeric as string
  dueDate: z.iso.datetime(),
  invoiceNumber: z.string(),
  issueDate: z.iso.datetime(),
  notes: z.string().nullable(),
  paidAt: z.iso.datetime().nullable(),
  paymentTerms: z.string().nullable(),
  quoteId: z.string().nullable(),
  sentAt: z.iso.datetime().nullable(),
  status: z.enum(BillingInvoiceStatusEnum).nullable(),
  subtotal: z.string().nullable(), // Numeric as string
  taxAmount: z.string().nullable(), // Numeric as string
  totalAmount: z.string(), // Numeric as string
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingInvoice = z.infer<typeof billingInvoiceSchema>;

export const billingInvoiceInsertSchema = billingInvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingInvoiceUpdateSchema = billingInvoiceInsertSchema.partial();
