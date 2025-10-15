import { z } from 'zod'
import { BillingPaymentMethodEnum, BillingPaymentStatusEnum } from '@/db/types'

// Zod schema for billing.payment table
export const billingPaymentSchema = z
  .object({
    id: z.uuid(),
    amount: z.coerce
      .number()
      .min(0, { message: 'Amount must be at least 0' })
      .max(10000000, { message: 'Amount must be at most 10,000,000' }),
    createdAt: z.date().optional().nullable(),
    currency: z
      .string()
      .min(1, { message: 'Currency is required' })
      .max(8, { message: 'Currency must be at most 8 characters' })
      .optional()
      .nullable(),
    exchangeRate: z.coerce
      .number()
      .min(0, { message: 'Exchange rate must be at least 0' })
      .max(1000, { message: 'Exchange rate must be at most 1000' })
      .optional()
      .nullable(),
    fees: z.coerce
      .number()
      .min(0, { message: 'Fees must be at least 0' })
      .max(100000, { message: 'Fees must be at most 100,000' })
      .optional()
      .nullable(),
    gatewayReference: z
      .string()
      .min(1, { message: 'Gateway reference is required' })
      .max(255, { message: 'Gateway reference must be at most 255 characters' })
      .optional()
      .nullable(),
    invoiceId: z.uuid(),
    netAmount: z.coerce
      .number()
      .min(0, { message: 'Net amount must be at least 0' })
      .max(10000000, { message: 'Net amount must be at most 10,000,000' })
      .optional()
      .nullable(),
    notes: z
      .string()
      .min(1, { message: 'Notes are required' })
      .max(1024, { message: 'Notes must be at most 1024 characters' })
      .optional()
      .nullable(),
    paymentDate: z.date().optional().nullable(),
    paymentMethod: z.enum(BillingPaymentMethodEnum),
    processedAt: z.date().optional().nullable(),
    processedByUserId: z
      .string()
      .min(1, { message: 'Processed by user ID is required' })
      .max(255, {
        message: 'Processed by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    status: z.enum(BillingPaymentStatusEnum).optional().nullable(),
    transactionId: z.uuid().optional().nullable(),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingPayment = z.infer<typeof billingPaymentSchema>

export const billingPaymentInsertSchema = billingPaymentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict()

export const billingPaymentUpdateSchema = billingPaymentInsertSchema.partial().strict()
