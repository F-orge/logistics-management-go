import { z } from 'zod';
import { BillingDisputeStatusEnum } from '@/db/types';

// Zod schema for billing.dispute table
export const billingDisputeSchema = z.object({
  id: z.uuid(),
  clientId: z.uuid(),
  createdAt: z.date().optional().nullable(),
  disputedAmount: z.coerce
    .number()
    .min(0, { error: 'Disputed amount must be at least 0' })
    .max(10000000, { error: 'Disputed amount must be at most 10,000,000' })
    .optional()
    .nullable(),
  lineItemId: z.uuid(),
  reason: z
    .string()
    .min(1, { error: 'Reason is required' })
    .max(255, { error: 'Reason must be at most 255 characters' }),
  resolutionNotes: z
    .string()
    .min(1, { error: 'Resolution notes are required' })
    .max(1024, { error: 'Resolution notes must be at most 1024 characters' })
    .optional()
    .nullable(),
  resolvedAt: z.date().optional().nullable(),
  resolvedByUserId: z
    .string()
    .min(1, { error: 'Resolved by user ID is required' })
    .max(255, { error: 'Resolved by user ID must be at most 255 characters' })
    .optional()
    .nullable(),
  status: z.enum(BillingDisputeStatusEnum).optional().nullable(),
  submittedAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export type BillingDispute = z.infer<typeof billingDisputeSchema>;

export const billingDisputeInsertSchema = billingDisputeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingDisputeUpdateSchema = billingDisputeInsertSchema.partial();
