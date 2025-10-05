import { z } from 'zod';

// Zod schema for billing.credit_note table
export const billingCreditNoteSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  appliedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  createdByUserId: z.string().nullable(),
  creditNoteNumber: z.string(),
  currency: z.string().nullable(),
  disputeId: z.uuid().nullable(),
  invoiceId: z.uuid(),
  issueDate: z.iso.datetime(),
  notes: z.string().nullable(),
  reason: z.string(),
  updatedAt: z.iso.datetime().nullable(),
});

export type BillingCreditNote = z.infer<typeof billingCreditNoteSchema>;

export const billingCreditNoteInsertSchema = billingCreditNoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingCreditNoteUpdateSchema =
  billingCreditNoteInsertSchema.partial();
