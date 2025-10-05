import { z } from 'zod';

export const wmsPickBatchItemSchema = z.object({
  id: z.uuid(),
  pickBatchId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce.number(),
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
