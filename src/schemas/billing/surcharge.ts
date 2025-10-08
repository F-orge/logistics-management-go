import { z } from 'zod';
import { BillingSurchargeCalculationMethodEnum } from '@/db/types';

// Zod schema for billing.surcharge table
export const billingSurchargeSchema = z.object({
  id: z.uuid(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(100000, { error: 'Amount must be at most 100,000' }),
  calculationMethod: z.enum(BillingSurchargeCalculationMethodEnum),
  createdAt: z.date().optional(),
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
  type: z
    .string()
    .min(1, { error: 'Type is required' })
    .max(64, { error: 'Type must be at most 64 characters' }),
  updatedAt: z.date().optional(),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
}).strict();

export type BillingSurcharge = z.infer<typeof billingSurchargeSchema>;

export const billingSurchargeInsertSchema = billingSurchargeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export const billingSurchargeUpdateSchema =
  billingSurchargeInsertSchema.partial().strict();
