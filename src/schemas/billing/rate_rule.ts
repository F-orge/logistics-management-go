import { z } from 'zod';
import { BillingPricingModelEnum } from '@/db/types';

// Zod schema for billing.rate_rule table
export const billingRateRuleSchema = z
  .object({
    id: z.uuid(),
    condition: z
      .string()
      .min(1, { error: 'Condition is required' })
      .max(255, { error: 'Condition must be at most 255 characters' }),
    createdAt: z.date().optional(),
    isActive: z.boolean().optional(),
    maxValue: z.coerce
      .number()
      .min(0, { error: 'Max value must be at least 0' })
      .max(10000000, { error: 'Max value must be at most 10,000,000' })
      .optional(),
    minValue: z.coerce
      .number()
      .min(0, { error: 'Min value must be at least 0' })
      .max(10000000, { error: 'Min value must be at most 10,000,000' })
      .optional(),
    price: z.coerce
      .number()
      .min(0, { error: 'Price must be at least 0' })
      .max(10000000, { error: 'Price must be at most 10,000,000' }),
    pricingModel: z.enum(BillingPricingModelEnum),
    priority: z
      .number()
      .min(0, { error: 'Priority must be at least 0' })
      .max(1000, { error: 'Priority must be at most 1000' })
      .optional(),
    rateCardId: z.uuid(),
    updatedAt: z.date().optional(),
    value: z
      .string()
      .min(1, { error: 'Value is required' })
      .max(255, { error: 'Value must be at most 255 characters' }),
  })
  .strict();

export type BillingRateRule = z.infer<typeof billingRateRuleSchema>;

export const billingRateRuleInsertSchema = billingRateRuleSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();

export const billingRateRuleUpdateSchema = billingRateRuleInsertSchema
  .partial()
  .strict();
