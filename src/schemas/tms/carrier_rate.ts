import { z } from 'zod';
import { TmsCarrierRateUnitEnum, TmsCurrencyEnum } from '@/db/types';

export const tmsCarrierRateSchema = z.object({
  id: z.uuid(),
  carrierId: z.uuid(),
  origin: z
    .string()
    .min(1, { error: 'Origin is required' })
    .max(255, { error: 'Origin must be at most 255 characters' }),
  destination: z
    .string()
    .min(1, { error: 'Destination is required' })
    .max(255, { error: 'Destination must be at most 255 characters' }),
  unit: z.enum(TmsCarrierRateUnitEnum).nullable(),
  rate: z.coerce
    .number()
    .min(0, { error: 'Rate must be at least 0' })
    .max(10000000, { error: 'Rate must be at most 10,000,000' }),
  currency: z.enum(TmsCurrencyEnum).nullable(),
  effectiveFrom: z.iso.datetime().nullable(),
  effectiveTo: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsCarrierRate = z.infer<typeof tmsCarrierRateSchema>;

export const tmsCarrierRateInsertSchema = tmsCarrierRateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsCarrierRateUpdateSchema = tmsCarrierRateInsertSchema.partial();
