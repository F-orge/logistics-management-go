import { z } from 'zod'
import { BillingSyncStatusEnum } from '../../db.types'

// Zod schema for .accounting_sync_log table
export const AccountingSyncLogSchema = z
  .object({
    id: z.uuid(),
    createdAt: z.date().optional().nullable(),
    errorMessage: z
      .string()
      .min(1, { message: 'Error message is required' })
      .max(1024, { message: 'Error message must be at most 1024 characters' })
      .optional()
      .nullable(),
    externalId: z.uuid().optional().nullable(),
    externalSystem: z
      .string()
      .min(1, { message: 'External system is required' })
      .max(64, { message: 'External system must be at most 64 characters' }),
    lastSyncAt: z.date().optional().nullable(),
    nextRetryAt: z.date().optional().nullable(),
    recordId: z.uuid(),
    recordType: z
      .string()
      .min(1, { message: 'Record type is required' })
      .max(64, { message: 'Record type must be at most 64 characters' }),
    requestPayload: z
      .string()
      .min(1, { message: 'Request payload is required' })
      .max(2048, { message: 'Request payload must be at most 2048 characters' })
      .optional()
      .nullable(),
    responsePayload: z
      .string()
      .min(1, { message: 'Response payload is required' })
      .max(2048, {
        message: 'Response payload must be at most 2048 characters',
      })
      .optional()
      .nullable(),
    retryCount: z
      .number()
      .min(0, { message: 'Retry count must be at least 0' })
      .max(100, { message: 'Retry count must be at most 100' })
      .optional()
      .nullable(),
    status: z.enum(BillingSyncStatusEnum).optional().nullable(),
    updatedAt: z.date().optional().nullable(),
  })
  .strict()

export type BillingAccountingSyncLog = z.infer<typeof AccountingSyncLogSchema>

export const AccountingSyncLogInsertSchema = AccountingSyncLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const AccountingSyncLogUpdateSchema = AccountingSyncLogInsertSchema.partial().strict()
