import { z } from 'zod';
import { BillingTransactionTypeEnum } from '@/db/types';

// Zod schema for billing.account_transaction table
export const billingAccountTransactionSchema = z.object({
  id: z.string(),
  amount: z.string(), // Numeric as string
  clientAccountId: z.string(),
  createdAt: z.iso.datetime().nullable(),
  description: z.string().nullable(),
  processedByUserId: z.string().nullable(),
  referenceNumber: z.string().nullable(),
  runningBalance: z.string().nullable(), // Numeric as string
  sourceRecordId: z.string().nullable(),
  sourceRecordType: z.string().nullable(),
  transactionDate: z.iso.datetime().nullable(),
  type: z.enum(BillingTransactionTypeEnum),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingAccountTransaction = z.infer<
  typeof billingAccountTransactionSchema
>;

export const billingAccountTransactionInsertSchema =
  billingAccountTransactionSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const billingAccountTransactionUpdateSchema =
  billingAccountTransactionInsertSchema.partial();
