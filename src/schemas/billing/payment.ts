import { z } from 'zod';
import { BillingPaymentMethodEnum, BillingPaymentStatusEnum } from '@/db/types';

// Zod schema for billing.payment table
export const billingPaymentSchema = z.object({
  id: z.uuid(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(10000000, { error: 'Amount must be at most 10,000,000' }),
  createdAt: z.iso.datetime().nullable(),
  currency: z
    .string()
    .min(1, { error: 'Currency is required' })
    .max(8, { error: 'Currency must be at most 8 characters' })
    .nullable(),
  exchangeRate: z.coerce
    .number()
    .min(0, { error: 'Exchange rate must be at least 0' })
    .max(1000, { error: 'Exchange rate must be at most 1000' })
    .nullable(),
  fees: z.coerce
    .number()
    .min(0, { error: 'Fees must be at least 0' })
    .max(100000, { error: 'Fees must be at most 100,000' })
    .nullable(),
  gatewayReference: z
    .string()
    .min(1, { error: 'Gateway reference is required' })
    .max(255, { error: 'Gateway reference must be at most 255 characters' })
    .nullable(),
  invoiceId: z.uuid(),
  netAmount: z.coerce
    .number()
    .min(0, { error: 'Net amount must be at least 0' })
    .max(10000000, { error: 'Net amount must be at most 10,000,000' })
    .nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  paymentDate: z.iso.datetime().nullable(),
  paymentMethod: z.enum(BillingPaymentMethodEnum),
  processedAt: z.iso.datetime().nullable(),
  processedByUserId: z
    .string()
    .min(1, { error: 'Processed by user ID is required' })
    .max(255, { error: 'Processed by user ID must be at most 255 characters' })
    .nullable(),
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
