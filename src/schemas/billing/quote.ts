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
  height: z.string().nullable(), // Numeric as string
  length: z.string().nullable(), // Numeric as string
  notes: z.string().nullable(),
  originDetails: z.string(),
  quotedPrice: z.string(), // Numeric as string
  quoteNumber: z.string().nullable(),
  serviceLevel: z.string().nullable(),
  status: z.enum(BillingQuoteStatusEnum).nullable(),
  updatedAt: z.iso.datetime().nullable(),
  volume: z.string().nullable(), // Numeric as string
  weight: z.string().nullable(), // Numeric as string
  width: z.string().nullable(), // Numeric as string
});

export type BillingQuote = z.infer<typeof billingQuoteSchema>;

export const billingQuoteInsertSchema = billingQuoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingQuoteUpdateSchema = billingQuoteInsertSchema.partial();
