import { z } from 'zod';
import { BillingSyncStatusEnum } from '@/db/types';

// Zod schema for billing.accounting_sync_log table
export const billingAccountingSyncLogSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  errorMessage: z
    .string()
    .min(1, { error: 'Error message is required' })
    .max(1024, { error: 'Error message must be at most 1024 characters' })
    .nullable(),
  externalId: z.uuid().nullable(),
  externalSystem: z
    .string()
    .min(1, { error: 'External system is required' })
    .max(64, { error: 'External system must be at most 64 characters' }),
  lastSyncAt: z.iso.datetime().nullable(),
  nextRetryAt: z.iso.datetime().nullable(),
  recordId: z.uuid(),
  recordType: z
    .string()
    .min(1, { error: 'Record type is required' })
    .max(64, { error: 'Record type must be at most 64 characters' }),
  requestPayload: z
    .string()
    .min(1, { error: 'Request payload is required' })
    .max(2048, { error: 'Request payload must be at most 2048 characters' })
    .nullable(),
  responsePayload: z
    .string()
    .min(1, { error: 'Response payload is required' })
    .max(2048, { error: 'Response payload must be at most 2048 characters' })
    .nullable(),
  retryCount: z
    .number()
    .min(0, { error: 'Retry count must be at least 0' })
    .max(100, { error: 'Retry count must be at most 100' })
    .nullable(),
  status: z.enum(BillingSyncStatusEnum).nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingAccountingSyncLog = z.infer<
  typeof billingAccountingSyncLogSchema
>;

export const billingAccountingSyncLogInsertSchema =
  billingAccountingSyncLogSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const billingAccountingSyncLogUpdateSchema =
  billingAccountingSyncLogInsertSchema.partial();
