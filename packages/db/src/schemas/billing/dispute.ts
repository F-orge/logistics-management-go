import { z } from 'zod'
import { BillingDisputeStatusEnum } from '../../db.types'

// Zod schema for .dispute table
export const DisputeSchema = z
  .object({
    id: z.uuid(),
    clientId: z.uuid(),
    createdAt: z.date().optional().nullable(),
    disputedAmount: z.coerce
      .number()
      .min(0, { message: 'Disputed amount must be at least 0' })
      .max(10000000, {
        message: 'Disputed amount must be at most 10,000,000',
      })
      .optional()
      .nullable(),
    lineItemId: z.uuid(),
    reason: z
      .string()
      .min(1, { message: 'Reason is required' })
      .max(255, { message: 'Reason must be at most 255 characters' }),
    resolutionNotes: z
      .string()
      .min(1, { message: 'Resolution notes are required' })
      .max(1024, {
        message: 'Resolution notes must be at most 1024 characters',
      })
      .optional()
      .nullable(),
    resolvedAt: z.date().optional().nullable(),
    resolvedByUserId: z
      .string()
      .min(1, { message: 'Resolved by user ID is required' })
      .max(255, {
        message: 'Resolved by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    status: z.enum(BillingDisputeStatusEnum).optional().nullable(),
    submittedAt: z.date().optional().nullable(),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingDispute = z.infer<typeof DisputeSchema>

export const DisputeInsertSchema = DisputeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict()

export const DisputeUpdateSchema = DisputeInsertSchema.partial().strict()
