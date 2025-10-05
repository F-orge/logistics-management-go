import { z } from 'zod';
import { BillingSyncStatusEnum } from '@/db/types';

// Zod schema for billing.accounting_sync_log table
export const billingAccountingSyncLogSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  errorMessage: z.string().nullable(),
  externalId: z.uuid().nullable(),
  externalSystem: z.string(),
  lastSyncAt: z.iso.datetime().nullable(),
  nextRetryAt: z.iso.datetime().nullable(),
  recordId: z.uuid(),
  recordType: z.string(),
  requestPayload: z.string().nullable(),
  responsePayload: z.string().nullable(),
  retryCount: z.number().nullable(),
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
