import { z } from 'zod';
import { BillingDisputeStatusEnum } from '@/db/types';

// Zod schema for billing.dispute table
export const billingDisputeSchema = z.object({
  id: z.string(),
  clientId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  disputedAmount: z.coerce.number().nullable(),
  lineItemId: z.uuid(),
  reason: z.string(),
  resolutionNotes: z.string().nullable(),
  resolvedAt: z.iso.datetime().nullable(),
  resolvedByUserId: z.string().nullable(),
  status: z.enum(BillingDisputeStatusEnum).nullable(),
  submittedAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingDispute = z.infer<typeof billingDisputeSchema>;

export const billingDisputeInsertSchema = billingDisputeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingDisputeUpdateSchema = billingDisputeInsertSchema.partial();
