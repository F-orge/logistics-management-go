import { z } from 'zod';

export const wmsPickBatchItemSchema = z.object({
  id: z.uuid(),
  pickBatchId: z.uuid(),
  productId: z.uuid(),
  quantity: z
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsPickBatchItem = z.infer<typeof wmsPickBatchItemSchema>;

export const wmsPickBatchItemInsertSchema = wmsPickBatchItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPickBatchItemUpdateSchema =
  wmsPickBatchItemInsertSchema.partial();
