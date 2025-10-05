import { z } from 'zod';
import { TmsCarrierRateUnitEnum, TmsCurrencyEnum } from '@/db/types';

export const tmsCarrierRateSchema = z.object({
  id: z.string(),
  carrierId: z.uuid(),
  origin: z.string(),
  destination: z.string(),
  unit: z.enum(TmsCarrierRateUnitEnum).nullable(),
  rate: z.coerce.number(),
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
