import { z } from 'zod';
import { BillingServiceTypeEnum } from '@/db/types';

// Zod schema for billing.rate_card table
export const billingRateCardSchema = z.object({
  id: z.uuid(),
  createdAt: z.date().optional(),
  createdByUserId: z
    .string()
    .min(1, { error: 'Created by user ID is required' })
    .max(255, { error: 'Created by user ID must be at most 255 characters' })
    .optional(),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .optional(),
  isActive: z.boolean().optional(),
  name: z
    .string()
    .min(1, { error: 'Name is required' })
    .max(255, { error: 'Name must be at most 255 characters' }),
  serviceType: z.enum(BillingServiceTypeEnum),
  updatedAt: z.date().optional(),
  validFrom: z.date(),
  validTo: z.date().optional(),
});

export type BillingRateCard = z.infer<typeof billingRateCardSchema>;

export const billingRateCardInsertSchema = billingRateCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingRateCardUpdateSchema =
  billingRateCardInsertSchema.partial();
