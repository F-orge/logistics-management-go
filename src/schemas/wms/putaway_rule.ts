import { z } from 'zod';

export const wmsPutawayRuleSchema = z.object({
  id: z.string(),
  productId: z.string(),
  locationId: z.string(),
  priority: z.string(), // Numeric as string
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
