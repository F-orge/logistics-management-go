import { z } from 'zod';

export const wmsPickBatchItemSchema = z.object({
  id: z.uuid(),
  pickBatchId: z.uuid(),
  salesOrderId: z.uuid(),
  orderPriority: z.number().nullable().optional(),
  estimatedPickTime: z.number().nullable().optional(),
  actualPickTime: z.number().nullable().optional(),
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
