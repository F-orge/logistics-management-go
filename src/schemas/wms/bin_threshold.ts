import { z } from 'zod';

export const wmsBinThresholdSchema = z.object({
  id: z.string(),
  binId: z.uuid(),
  minQuantity: z.coerce.number(),
  maxQuantity: z.coerce.number(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsBinThreshold = z.infer<typeof wmsBinThresholdSchema>;

export const wmsBinThresholdInsertSchema = wmsBinThresholdSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsBinThresholdUpdateSchema =
  wmsBinThresholdInsertSchema.partial();
