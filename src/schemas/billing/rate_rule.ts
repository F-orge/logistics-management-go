import { z } from 'zod';
import { BillingPricingModelEnum } from '@/db/types';

// Zod schema for billing.rate_rule table
export const billingRateRuleSchema = z.object({
  id: z.string(),
  condition: z.string(),
  createdAt: z.iso.datetime().nullable(),
  isActive: z.boolean().nullable(),
  maxValue: z.string().nullable(), // Numeric as string
  minValue: z.string().nullable(), // Numeric as string
  price: z.string(), // Numeric as string
  pricingModel: z.enum(BillingPricingModelEnum),
  priority: z.number().nullable(),
  rateCardId: z.string(),
  updatedAt: z.iso.datetime().nullable(),
  value: z.string(),
});

export type BillingRateRule = z.infer<typeof billingRateRuleSchema>;

export const billingRateRuleInsertSchema = billingRateRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingRateRuleUpdateSchema =
  billingRateRuleInsertSchema.partial();
