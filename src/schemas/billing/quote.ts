import { z } from 'zod';
import { BillingQuoteStatusEnum } from '@/db/types';

// Zod schema for billing.quote table
export const billingQuoteSchema = z
  .object({
    id: z.uuid(),
    clientId: z.uuid().optional().nullable(),
    createdAt: z.date().optional().nullable(),
    createdByUserId: z
      .string()
      .min(1, { message: 'Created by user ID is required' })
      .max(255, {
        message: 'Created by user ID must be at most 255 characters',
      })
      .optional()
      .nullable(),
    destinationDetails: z
      .string()
      .min(1, { message: 'Destination details are required' })
      .max(255, {
        message: 'Destination details must be at most 255 characters',
      }),
    expiresAt: z.date().optional().nullable(),
    height: z.coerce
      .number()
      .min(0, { message: 'Height must be at least 0' })
      .max(10000, { message: 'Height must be at most 10,000' })
      .optional()
      .nullable(),
    length: z.coerce
      .number()
      .min(0, { message: 'Length must be at least 0' })
      .max(10000, { message: 'Length must be at most 10,000' })
      .optional()
      .nullable(),
    notes: z
      .string()
      .min(1, { message: 'Notes are required' })
      .max(1024, { message: 'Notes must be at most 1024 characters' })
      .optional()
      .nullable(),
    originDetails: z
      .string()
      .min(1, { message: 'Origin details are required' })
      .max(255, { message: 'Origin details must be at most 255 characters' }),
    quotedPrice: z.coerce
      .number()
      .min(0, { message: 'Quoted price must be at least 0' })
      .max(10000000, { message: 'Quoted price must be at most 10,000,000' }),
    quoteNumber: z
      .string()
      .min(1, { message: 'Quote number is required' })
      .max(64, { message: 'Quote number must be at most 64 characters' })
      .optional()
      .nullable(),
    serviceLevel: z
      .string()
      .min(1, { message: 'Service level is required' })
      .max(64, { message: 'Service level must be at most 64 characters' })
      .optional()
      .nullable(),
    status: z.enum(BillingQuoteStatusEnum).optional().nullable(),
    updatedAt: z.date().optional().nullable(),
    volume: z.coerce
      .number()
      .min(0, { message: 'Volume must be at least 0' })
      .max(100000, { message: 'Volume must be at most 100,000' })
      .optional()
      .nullable(),
    weight: z.coerce
      .number()
      .min(0, { message: 'Weight must be at least 0' })
      .max(100000, { message: 'Weight must be at most 100,000' })
      .optional()
      .nullable(),
    width: z.coerce
      .number()
      .min(0, { message: 'Width must be at least 0' })
      .max(10000, { message: 'Width must be at most 10,000' })
      .optional()
      .nullable(),
  })
  .strict();

export type BillingQuote = z.infer<typeof billingQuoteSchema>;

export const billingQuoteInsertSchema = billingQuoteSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();

export const billingQuoteUpdateSchema = billingQuoteInsertSchema
  .partial()
  .strict();
