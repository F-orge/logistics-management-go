import { z } from 'zod';

export const wmsTaskItemSchema = z.object({
  id: z.string(),
  taskId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce.number(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsTaskItem = z.infer<typeof wmsTaskItemSchema>;

export const wmsTaskItemInsertSchema = wmsTaskItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsTaskItemUpdateSchema = wmsTaskItemInsertSchema.partial();
