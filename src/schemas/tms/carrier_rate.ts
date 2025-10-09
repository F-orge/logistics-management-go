import { z } from 'zod';
import { TmsCarrierRateUnitEnum, TmsCurrencyEnum } from '@/db/types';

export const tmsCarrierRateSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  carrierId: z.uuid({ message: 'Invalid UUID format for carrier ID' }),
  origin: z
    .string({ message: 'Origin must be a string' })
    .min(1, { error: 'Origin is required' })
    .max(255, { error: 'Origin must be at most 255 characters' }),
  destination: z
    .string({ message: 'Destination must be a string' })
    .min(1, { error: 'Destination is required' })
    .max(255, { error: 'Destination must be at most 255 characters' }),
  unit: z
    .enum(TmsCarrierRateUnitEnum, { message: 'Invalid carrier rate unit' })
    .optional()
    .nullable(),
  rate: z.coerce
    .number({ message: 'Rate must be a number' })
    .min(0, { error: 'Rate must be at least 0' })
    .max(10000000, { error: 'Rate must be at most 10,000,000' }),
  currency: z
    .enum(TmsCurrencyEnum, { message: 'Invalid currency type' })
    .optional()
    .nullable(),
  effectiveFrom: z
    .date({ message: 'Invalid date format for effective from' })
    .optional()
    .nullable(),
  effectiveTo: z
    .date({ message: 'Invalid date format for effective to' })
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsCarrierRate = z.infer<typeof tmsCarrierRateSchema>;

export const tmsCarrierRateInsertSchema = tmsCarrierRateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsCarrierRateUpdateSchema = tmsCarrierRateInsertSchema.partial();
