import { z } from 'zod';
import { WmsLocationTypeEnum } from '@/db/types';

export const wmsPutawayRuleSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  warehouseId: z.uuid(),
  priority: z
    .number()
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' })
    .optional(),
  clientId: z.uuid().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
  locationType: z.enum(WmsLocationTypeEnum).nullable().optional(),
  maxQuantity: z.number().nullable().optional(),
  minQuantity: z.number().nullable().optional(),
  preferredLocationId: z.uuid().nullable().optional(),
  requiresHazmatApproval: z.boolean().nullable().optional(),
  requiresTemperatureControl: z.boolean().nullable().optional(),
  volumeThreshold: z.number().nullable().optional(),
  weightThreshold: z.number().nullable().optional(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsPutawayRule = z.infer<typeof wmsPutawayRuleSchema>;

export const wmsPutawayRuleInsertSchema = wmsPutawayRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPutawayRuleUpdateSchema = wmsPutawayRuleInsertSchema.partial();
