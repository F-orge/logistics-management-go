import { z } from 'zod';
import { WmsTaskItemStatusEnum } from '@/db/types';

export const wmsTaskItemSchema = z.object({
  id: z.uuid(),
  taskId: z.uuid(),
  productId: z.uuid(),
  quantityRequired: z.coerce
    .number()
    .min(0, { error: 'Quantity required must be at least 0' })
    .max(1000000, { error: 'Quantity required must be at most 1,000,000' }),
  quantityCompleted: z.coerce
    .number()
    .min(0, { error: 'Quantity completed must be at least 0' })
    .max(1000000, { error: 'Quantity completed must be at most 1,000,000' })
    .optional(),
  quantityRemaining: z.number().nullable().optional(),
  status: z.enum(WmsTaskItemStatusEnum).nullable(),
  batchId: z.uuid().nullable().optional(),
  completedAt: z.iso.datetime().nullable().optional(),
  destinationLocationId: z.uuid().nullable().optional(),
  expiryDate: z.iso.datetime().nullable().optional(),
  lotNumber: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  serialNumbers: z.array(z.string()).nullable().optional(),
  sourceLocationId: z.uuid().nullable().optional(),
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
