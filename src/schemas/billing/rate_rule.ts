import { z } from 'zod';
import { BillingPricingModelEnum } from '@/db/types';

// Zod schema for billing.rate_rule table
export const billingRateRuleSchema = z.object({
  id: z.uuid(),
  condition: z
    .string()
    .min(1, { error: 'Condition is required' })
    .max(255, { error: 'Condition must be at most 255 characters' }),
  createdAt: z.iso.datetime().nullable(),
  isActive: z.boolean().nullable(),
  maxValue: z.coerce
    .number()
    .min(0, { error: 'Max value must be at least 0' })
    .max(10000000, { error: 'Max value must be at most 10,000,000' })
    .nullable(),
  minValue: z.coerce
    .number()
    .min(0, { error: 'Min value must be at least 0' })
    .max(10000000, { error: 'Min value must be at most 10,000,000' })
    .nullable(),
  price: z.coerce
    .number()
    .min(0, { error: 'Price must be at least 0' })
    .max(10000000, { error: 'Price must be at most 10,000,000' }),
  pricingModel: z.enum(BillingPricingModelEnum),
  priority: z
    .number()
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' })
    .nullable(),
  rateCardId: z.uuid(),
  updatedAt: z.iso.datetime().nullable(),
  value: z
    .string()
    .min(1, { error: 'Value is required' })
    .max(255, { error: 'Value must be at most 255 characters' }),
});

export type BillingRateRule = z.infer<typeof billingRateRuleSchema>;

export const billingRateRuleInsertSchema = billingRateRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingRateRuleUpdateSchema =
  billingRateRuleInsertSchema.partial();
