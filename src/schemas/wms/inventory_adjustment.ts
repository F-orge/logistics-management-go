import { z } from 'zod';

export const wmsInventoryAdjustmentSchema = z.object({
  id: z.string(),
  stockId: z.string(),
  reason: z.string(),
  quantity: z.coerce.number(),
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
