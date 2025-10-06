import { z } from 'zod';
import { WmsInventoryAdjustmentReasonEnum } from '@/db/types';

export const wmsInventoryAdjustmentSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  warehouseId: z.uuid(),
  userId: z.string().uuid(),
  quantityChange: z.coerce
    .number()
    .min(-1000000, { error: 'Quantity change must be at least -1,000,000' })
    .max(1000000, { error: 'Quantity change must be at most 1,000,000' }),
  reason: z.enum(WmsInventoryAdjustmentReasonEnum).nullable(),
  notes: z.string().nullable().optional(),
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
