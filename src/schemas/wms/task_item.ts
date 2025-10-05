import { z } from 'zod';
import { WmsTaskItemStatusEnum } from '@/db/types';

export const wmsTaskItemSchema = z.object({
  id: z.uuid(),
  taskId: z
    .string()
    .min(1, { error: 'Task ID is required' })
    .max(255, { error: 'Task ID must be at most 255 characters' }),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
  quantity: z.coerce
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  status: z.enum(WmsTaskItemStatusEnum).nullable(),
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
