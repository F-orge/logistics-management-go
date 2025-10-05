import { z } from 'zod';

export const wmsPutawayRuleSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  locationId: z.uuid(),
  priority: z
    .number()
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' }),
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
