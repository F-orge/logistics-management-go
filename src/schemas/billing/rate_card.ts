import { z } from 'zod';
import { BillingServiceTypeEnum } from '@/db/types';

// Zod schema for billing.rate_card table
export const billingRateCardSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime().nullable(),
  createdByUserId: z.string().nullable(),
  description: z.string().nullable(),
  isActive: z.boolean().nullable(),
  name: z.string(),
  serviceType: z.enum(BillingServiceTypeEnum),
  updatedAt: z.iso.datetime().nullable(),
  validFrom: z.iso.datetime(),
  validTo: z.iso.datetime().nullable(),
});

export type BillingRateCard = z.infer<typeof billingRateCardSchema>;

export const billingRateCardInsertSchema = billingRateCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingRateCardUpdateSchema =
  billingRateCardInsertSchema.partial();
