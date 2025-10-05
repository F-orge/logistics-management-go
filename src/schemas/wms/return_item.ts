import { z } from 'zod';

export const wmsReturnItemSchema = z.object({
  id: z.string(),
  returnId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce.number(),
  condition: z.string(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsReturnItem = z.infer<typeof wmsReturnItemSchema>;

export const wmsReturnItemInsertSchema = wmsReturnItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsReturnItemUpdateSchema = wmsReturnItemInsertSchema.partial();
