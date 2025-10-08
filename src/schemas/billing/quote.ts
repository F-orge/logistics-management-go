import { z } from 'zod';
import { BillingQuoteStatusEnum } from '@/db/types';

// Zod schema for billing.quote table
export const billingQuoteSchema = z.object({
  id: z.uuid(),
  clientId: z.uuid().optional(),
  createdAt: z.date().optional(),
  createdByUserId: z
    .string()
    .min(1, { error: 'Created by user ID is required' })
    .max(255, { error: 'Created by user ID must be at most 255 characters' })
    .optional(),
  destinationDetails: z
    .string()
    .min(1, { error: 'Destination details are required' })
    .max(255, { error: 'Destination details must be at most 255 characters' }),
  expiresAt: z.date().optional(),
  height: z.coerce
    .number()
    .min(0, { error: 'Height must be at least 0' })
    .max(10000, { error: 'Height must be at most 10,000' })
    .optional(),
  length: z.coerce
    .number()
    .min(0, { error: 'Length must be at least 0' })
    .max(10000, { error: 'Length must be at most 10,000' })
    .optional(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional(),
  originDetails: z
    .string()
    .min(1, { error: 'Origin details are required' })
    .max(255, { error: 'Origin details must be at most 255 characters' }),
  quotedPrice: z.coerce
    .number()
    .min(0, { error: 'Quoted price must be at least 0' })
    .max(10000000, { error: 'Quoted price must be at most 10,000,000' }),
  quoteNumber: z
    .string()
    .min(1, { error: 'Quote number is required' })
    .max(64, { error: 'Quote number must be at most 64 characters' })
    .optional(),
  serviceLevel: z
    .string()
    .min(1, { error: 'Service level is required' })
    .max(64, { error: 'Service level must be at most 64 characters' })
    .optional(),
  status: z.enum(BillingQuoteStatusEnum).optional(),
  updatedAt: z.date().optional(),
  volume: z.coerce
    .number()
    .min(0, { error: 'Volume must be at least 0' })
    .max(100000, { error: 'Volume must be at most 100,000' })
    .optional(),
  weight: z.coerce
    .number()
    .min(0, { error: 'Weight must be at least 0' })
    .max(100000, { error: 'Weight must be at most 100,000' })
    .optional(),
  width: z.coerce
    .number()
    .min(0, { error: 'Width must be at least 0' })
    .max(10000, { error: 'Width must be at most 10,000' })
    .optional(),
});

export type BillingQuote = z.infer<typeof billingQuoteSchema>;

export const billingQuoteInsertSchema = billingQuoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export const billingQuoteUpdateSchema = billingQuoteInsertSchema.partial().strict();
