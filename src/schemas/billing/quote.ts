import { z } from 'zod';
import { BillingQuoteStatusEnum } from '@/db/types';

// Zod schema for billing.quote table
export const billingQuoteSchema = z.object({
  id: z.string(),
  clientId: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  createdByUserId: z.string().nullable(),
  destinationDetails: z.string(),
  expiresAt: z.iso.datetime().nullable(),
  height: z.coerce.number().nullable(),
  length: z.coerce.number().nullable(),
  notes: z.string().nullable(),
  originDetails: z.string(),
  quotedPrice: z.coerce.number(),
  quoteNumber: z.string().nullable(),
  serviceLevel: z.string().nullable(),
  status: z.enum(BillingQuoteStatusEnum).nullable(),
  updatedAt: z.iso.datetime().nullable(),
  volume: z.coerce.number().nullable(),
  weight: z.coerce.number().nullable(),
  width: z.coerce.number().nullable(),
});

export type BillingQuote = z.infer<typeof billingQuoteSchema>;

export const billingQuoteInsertSchema = billingQuoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingQuoteUpdateSchema = billingQuoteInsertSchema.partial();
