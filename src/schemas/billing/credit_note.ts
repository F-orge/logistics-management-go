import { z } from 'zod';

// Zod schema for billing.credit_note table
export const billingCreditNoteSchema = z.object({
  id: z.uuid(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(10000000, { error: 'Amount must be at most 10,000,000' }),
  appliedAt: z.date().optional(),
  createdAt: z.date().optional(),
  createdByUserId: z
    .string()
    .min(1, { error: 'Created by user ID is required' })
    .max(255, { error: 'Created by user ID must be at most 255 characters' })
    .optional(),
  creditNoteNumber: z
    .string()
    .min(1, { error: 'Credit note number is required' })
    .max(64, { error: 'Credit note number must be at most 64 characters' }),
  currency: z
    .string()
    .min(1, { error: 'Currency is required' })
    .max(8, { error: 'Currency must be at most 8 characters' })
    .optional(),
  disputeId: z.uuid().optional(),
  invoiceId: z.uuid(),
  issueDate: z.date(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional(),
  reason: z
    .string()
    .min(1, { error: 'Reason is required' })
    .max(255, { error: 'Reason must be at most 255 characters' }),
  updatedAt: z.date().optional(),
});

export type BillingCreditNote = z.infer<typeof billingCreditNoteSchema>;

export const billingCreditNoteInsertSchema = billingCreditNoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingCreditNoteUpdateSchema =
  billingCreditNoteInsertSchema.partial();
