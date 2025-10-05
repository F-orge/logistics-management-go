import { z } from 'zod';
import { WmsReturnItemConditionEnum } from '@/db/types';

export const wmsReturnItemSchema = z.object({
  id: z.uuid(),
  returnId: z
    .string()
    .min(1, { error: 'Return ID is required' })
    .max(255, { error: 'Return ID must be at most 255 characters' }),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
  quantity: z.coerce
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
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
