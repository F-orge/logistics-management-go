import { z } from 'zod';
import { WmsReturnItemConditionEnum } from '@/db/types';

export const wmsReturnItemSchema = z.object({
  id: z.uuid(),
  returnId: z.uuid(),
  productId: z.uuid(),
  quantityExpected: z.coerce
    .number()
    .min(0, { error: 'Quantity expected must be at least 0' })
    .max(1000000, { error: 'Quantity expected must be at most 1,000,000' }),
  quantityReceived: z.coerce
    .number()
    .min(0, { error: 'Quantity received must be at least 0' })
    .max(1000000, { error: 'Quantity received must be at most 1,000,000' })
    .nullable()
    .optional(),
  quantityVariance: z.number().nullable().optional(),
  condition: z.enum(WmsReturnItemConditionEnum).nullable(),
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
