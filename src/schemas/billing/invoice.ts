import { z } from 'zod';
import { BillingInvoiceStatusEnum } from '@/db/types';

// Zod schema for billing.invoice table
export const billingInvoiceSchema = z.object({
  id: z.uuid(),
  amountOutstanding: z.coerce.number().nullable(),
  amountPaid: z.coerce.number().nullable(),
  clientId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  createdByUserId: z.string().nullable(),
  currency: z.string().nullable(),
  discountAmount: z.coerce.number().nullable(),
  dueDate: z.iso.datetime(),
  invoiceNumber: z.string(),
  issueDate: z.iso.datetime(),
  notes: z.string().nullable(),
  paidAt: z.iso.datetime().nullable(),
  paymentTerms: z.string().nullable(),
  quoteId: z.uuid().nullable(),
  sentAt: z.iso.datetime().nullable(),
  status: z.enum(BillingInvoiceStatusEnum).nullable(),
  subtotal: z.coerce.number().nullable(),
  taxAmount: z.coerce.number().nullable(),
  totalAmount: z.coerce.number(),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingInvoice = z.infer<typeof billingInvoiceSchema>;

export const billingInvoiceInsertSchema = billingInvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingInvoiceUpdateSchema = billingInvoiceInsertSchema.partial();
