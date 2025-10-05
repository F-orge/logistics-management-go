import { z } from 'zod';
import { BillingSurchargeCalculationMethodEnum } from '@/db/types';

// Zod schema for billing.surcharge table
export const billingSurchargeSchema = z.object({
  id: z.uuid(),
  amount: z.coerce.number(),
  calculationMethod: z.enum(BillingSurchargeCalculationMethodEnum),
  createdAt: z.iso.datetime().nullable(),
  description: z.string().nullable(),
  isActive: z.boolean().nullable(),
  name: z.string(),
  type: z.string(),
  updatedAt: z.iso.datetime().nullable(),
  validFrom: z.iso.datetime().nullable(),
  validTo: z.iso.datetime().nullable(),
});

export type BillingSurcharge = z.infer<typeof billingSurchargeSchema>;

export const billingSurchargeInsertSchema = billingSurchargeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const billingSurchargeUpdateSchema =
  billingSurchargeInsertSchema.partial();
