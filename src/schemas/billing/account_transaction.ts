import { z } from 'zod';
import { BillingTransactionTypeEnum } from '@/db/types';

// Zod schema for billing.account_transaction table
export const billingAccountTransactionSchema = z.object({
  id: z.uuid(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(10000000, { error: 'Amount must be at most 10,000,000' }),
  clientAccountId: z
    .string()
    .min(1, { error: 'Client account ID is required' })
    .max(255, { error: 'Client account ID must be at most 255 characters' }),
  createdAt: z.date().optional().nullable(),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .optional()
    .nullable(),
  processedByUserId: z
    .string()
    .min(1, { error: 'Processed by user ID is required' })
    .max(255, { error: 'Processed by user ID must be at most 255 characters' })
    .optional()
    .nullable(),
  referenceNumber: z
    .string()
    .min(1, { error: 'Reference number is required' })
    .max(64, { error: 'Reference number must be at most 64 characters' })
    .optional()
    .nullable(),
  runningBalance: z.coerce
    .number()
    .min(0, { error: 'Running balance must be at least 0' })
    .max(100000000, { error: 'Running balance must be at most 100,000,000' })
    .optional()
    .nullable(),
  sourceRecordId: z.uuid().optional().nullable(),
  sourceRecordType: z
    .string()
    .min(1, { error: 'Source record type is required' })
    .max(64, { error: 'Source record type must be at most 64 characters' })
    .optional()
    .nullable(),
  transactionDate: z.date().optional().nullable(),
  type: z.enum(BillingTransactionTypeEnum),
  updatedAt: z.date().optional().nullable(),
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
