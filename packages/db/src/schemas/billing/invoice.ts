import { z } from 'zod'
import { BillingInvoiceStatusEnum } from '@/db.types'

// Zod schema for .invoice table
export const InvoiceSchema = z
  .object({
    id: z.uuid(),
    amountOutstanding: z.coerce
      .number()
      .min(0, { message: 'Amount outstanding must be at least 0' })
      .max(10000000, {
        message: 'Amount outstanding must be at most 10,000,000',
      })
      .optional()
      .nullable(),
    amountPaid: z.coerce
      .number()
      .min(0, { message: 'Amount paid must be at least 0' })
      .max(10000000, { message: 'Amount paid must be at most 10,000,000' })
      .optional()
      .nullable(),
    clientId: z.uuid(),
    createdAt: z.date().optional().nullable(),
    createdByUserId: z
      .string()
      .min(1, { message: 'Created by user ID is required' })
      .max(255, {
        message: 'Created by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    currency: z
      .string()
      .min(1, { message: 'Currency is required' })
      .max(8, { message: 'Currency must be at most 8 characters' })
      .optional()
      .nullable(),
    discountAmount: z.coerce
      .number()
      .min(0, { message: 'Discount amount must be at least 0' })
      .max(1000000, { message: 'Discount amount must be at most 1,000,000' })
      .optional()
      .nullable(),
    dueDate: z.date(),
    invoiceNumber: z
      .string()
      .min(1, { message: 'Invoice number is required' })
      .max(64, { message: 'Invoice number must be at most 64 characters' }),
    issueDate: z.date(),
    notes: z
      .string()
      .min(1, { message: 'Notes are required' })
      .max(1024, { message: 'Notes must be at most 1024 characters' })
      .optional()
      .nullable(),
    paidAt: z.date().optional().nullable(),
    paymentTerms: z
      .string()
      .min(1, { message: 'Payment terms are required' })
      .max(255, { message: 'Payment terms must be at most 255 characters' })
      .optional()
      .nullable(),
    quoteId: z.uuid().optional().nullable(),
    sentAt: z.date().optional().nullable(),
    status: z.enum(BillingInvoiceStatusEnum).optional().nullable(),
    subtotal: z.coerce
      .number()
      .min(0, { message: 'Subtotal must be at least 0' })
      .max(10000000, { message: 'Subtotal must be at most 10,000,000' })
      .optional()
      .nullable(),
    taxAmount: z.coerce
      .number()
      .min(0, { message: 'Tax amount must be at least 0' })
      .max(1000000, { message: 'Tax amount must be at most 1,000,000' })
      .optional()
      .nullable(),
    totalAmount: z.coerce
      .number()
      .min(0, { message: 'Total amount must be at least 0' })
      .max(10000000, { message: 'Total amount must be at most 10,000,000' }),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingInvoice = z.infer<typeof InvoiceSchema>

export const InvoiceInsertSchema = InvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict()

export const InvoiceUpdateSchema = InvoiceInsertSchema.partial().strict()
