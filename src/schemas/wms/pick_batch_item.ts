import { z } from 'zod';

export const wmsPickBatchItemSchema = z.object({
  id: z.string(),
  pickBatchId: z.string(),
  productId: z.string(),
  quantity: z.string(), // Numeric as string
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
