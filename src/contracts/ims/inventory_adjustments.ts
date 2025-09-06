import { oc } from '@orpc/contract';
import z from 'zod';
import {
  inventoryAdjustmentSchema,
  insertInventoryAdjustmentSchema,
  updateInventoryAdjustmentSchema,
} from '@/db/schemas/ims/inventory_adjustments.schema';

export const create = oc
  .input(insertInventoryAdjustmentSchema)
  .output(inventoryAdjustmentSchema);
export const list = oc.output(z.array(inventoryAdjustmentSchema));
export const view = oc.input(z.uuid()).output(inventoryAdjustmentSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateInventoryAdjustmentSchema }))
  .output(inventoryAdjustmentSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
