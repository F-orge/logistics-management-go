import { z } from 'zod'

// Zod schema for .credit_note table
export const CreditNoteSchema = z
  .object({
    id: z.uuid(),
    amount: z.coerce
      .number()
      .min(0, { message: 'Amount must be at least 0' })
      .max(10000000, { message: 'Amount must be at most 10,000,000' }),
    appliedAt: z.date().optional().nullable(),
    createdAt: z.date().optional().nullable(),
    createdByUserId: z
      .string()
      .min(1, { message: 'Created by user ID is required' })
      .max(255, {
        message: 'Created by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    creditNoteNumber: z
      .string()
      .min(1, { message: 'Credit note number is required' })
      .max(64, { message: 'Credit note number must be at most 64 characters' }),
    currency: z
      .string()
      .min(1, { message: 'Currency is required' })
      .max(8, { message: 'Currency must be at most 8 characters' })
      .optional()
      .nullable(),
    disputeId: z.uuid().optional().nullable(),
    invoiceId: z.uuid(),
    issueDate: z.date(),
    notes: z
      .string()
      .min(1, { message: 'Notes are required' })
      .max(1024, { message: 'Notes must be at most 1024 characters' })
      .optional()
      .nullable(),
    reason: z
      .string()
      .min(1, { message: 'Reason is required' })
      .max(255, { message: 'Reason must be at most 255 characters' }),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingCreditNote = z.infer<typeof CreditNoteSchema>

export const CreditNoteInsertSchema = CreditNoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict()

export const CreditNoteUpdateSchema = CreditNoteInsertSchema.partial().strict()
