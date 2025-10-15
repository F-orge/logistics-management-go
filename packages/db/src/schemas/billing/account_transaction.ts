import { z } from 'zod'
import { BillingTransactionTypeEnum } from '@/db.types'

// Zod schema for .account_transaction table
export const AccountTransactionSchema = z
  .object({
    id: z.uuid(),
    amount: z.coerce
      .number()
      .min(0, { message: 'Amount must be at least 0' })
      .max(10000000, { message: 'Amount must be at most 10,000,000' }),
    clientAccountId: z.string().min(1, { message: 'Client account ID is required' }).max(255, {
      message: 'Client account ID must be at most 255 characters',
    }),
    createdAt: z.date().optional().nullable(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .max(1024, { message: 'Description must be at most 1024 characters' })
      .optional()
      .nullable(),
    processedByUserId: z
      .string()
      .min(1, { message: 'Processed by user ID is required' })
      .max(255, {
        message: 'Processed by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    referenceNumber: z
      .string()
      .min(1, { message: 'Reference number is required' })
      .max(64, { message: 'Reference number must be at most 64 characters' })
      .optional()
      .nullable(),
    runningBalance: z.coerce
      .number()
      .min(0, { message: 'Running balance must be at least 0' })
      .max(100000000, {
        message: 'Running balance must be at most 100,000,000',
      })
      .optional()
      .nullable(),
    sourceRecordId: z.uuid().optional().nullable(),
    sourceRecordType: z
      .string()
      .min(1, { message: 'Source record type is required' })
      .max(64, { message: 'Source record type must be at most 64 characters' })
      .optional()
      .nullable(),
    transactionDate: z.date().optional().nullable(),
    type: z.enum(BillingTransactionTypeEnum),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingAccountTransaction = z.infer<typeof AccountTransactionSchema>

export const AccountTransactionInsertSchema = AccountTransactionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const AccountTransactionUpdateSchema = AccountTransactionInsertSchema.partial().strict()
