import { z } from 'zod';

// Zod schema for billing.client_account table
export const billingClientAccountSchema = z.object({
  id: z.uuid(),
  availableCredit: z.coerce
    .number()
    .min(0, { error: 'Available credit must be at least 0' })
    .max(10000000, { error: 'Available credit must be at most 10,000,000' })
    .optional()
    .nullable(),
  clientId: z.uuid(),
  createdAt: z.date().optional().nullable(),
  creditLimit: z.coerce
    .number()
    .min(0, { error: 'Credit limit must be at least 0' })
    .max(10000000, { error: 'Credit limit must be at most 10,000,000' })
    .optional()
    .nullable(),
  currency: z
    .string()
    .min(1, { error: 'Currency is required' })
    .max(8, { error: 'Currency must be at most 8 characters' })
    .optional()
    .nullable(),
  isCreditApproved: z.boolean().optional().nullable(),
  lastPaymentDate: z.date().optional().nullable(),
  paymentTermsDays: z
    .number()
    .min(0, { error: 'Payment terms days must be at least 0' })
    .max(365, { error: 'Payment terms days must be at most 365' })
    .optional()
    .nullable(),
  updatedAt: z.date().optional().nullable(),
  walletBalance: z.coerce
    .number()
    .min(0, { error: 'Wallet balance must be at least 0' })
    .max(10000000, { error: 'Wallet balance must be at most 10,000,000' })
    .optional()
    .nullable(),
});

export type BillingClientAccount = z.infer<typeof billingClientAccountSchema>;

export const billingClientAccountInsertSchema = billingClientAccountSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  },
);

export const billingClientAccountUpdateSchema =
  billingClientAccountInsertSchema.partial();
