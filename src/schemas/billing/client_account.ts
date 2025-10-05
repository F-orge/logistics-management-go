import { z } from 'zod';

// Zod schema for billing.client_account table
export const billingClientAccountSchema = z.object({
  id: z.uuid(),
  availableCredit: z.coerce.number().nullable(),
  clientId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  creditLimit: z.coerce.number().nullable(),
  currency: z.string().nullable(),
  isCreditApproved: z.boolean().nullable(),
  lastPaymentDate: z.iso.datetime().nullable(),
  paymentTermsDays: z.number().nullable(),
  updatedAt: z.iso.datetime().nullable(),
  walletBalance: z.coerce.number().nullable(),
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
