import { z } from 'zod';
import { BillingPaymentMethodEnum, BillingPaymentStatusEnum } from '@/db/types';

// Zod schema for billing.payment table
export const billingPaymentSchema = z.object({
  id: z.uuid(),
  amount: z.coerce.number(),
  createdAt: z.iso.datetime().nullable(),
  currency: z.string().nullable(),
  exchangeRate: z.coerce.number().nullable(),
  fees: z.coerce.number().nullable(),
  gatewayReference: z.string().nullable(),
  invoiceId: z.uuid(),
  netAmount: z.coerce.number().nullable(),
  notes: z.string().nullable(),
  paymentDate: z.iso.datetime().nullable(),
  paymentMethod: z.enum(BillingPaymentMethodEnum),
  processedAt: z.iso.datetime().nullable(),
  processedByUserId: z.string().nullable(),
  status: z.enum(BillingPaymentStatusEnum).nullable(),
  transactionId: z.uuid().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingPayment = z.infer<typeof billingPaymentSchema>;

export const billingPaymentInsertSchema = billingPaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingPaymentUpdateSchema = billingPaymentInsertSchema.partial();
