import { z } from 'zod';
import { WmsInventoryAdjustmentReasonEnum } from '@/db/types';

export const wmsInventoryAdjustmentSchema = z.object({
  id: z.uuid(),
  stockId: z
    .string()
    .min(1, { error: 'Stock ID is required' })
    .max(255, { error: 'Stock ID must be at most 255 characters' }),
  reason: z.enum(WmsInventoryAdjustmentReasonEnum).nullable(),
  quantity: z.coerce
    .number()
    .min(-1000000, { error: 'Quantity must be at least -1,000,000' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInventoryAdjustment = z.infer<
  typeof wmsInventoryAdjustmentSchema
>;

export const wmsInventoryAdjustmentInsertSchema =
  wmsInventoryAdjustmentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const wmsInventoryAdjustmentUpdateSchema =
  wmsInventoryAdjustmentInsertSchema.partial();
