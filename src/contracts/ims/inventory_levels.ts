import { oc } from '@orpc/contract';
import z from 'zod';
import {
  inventoryLevelSchema,
  insertInventoryLevelSchema,
  updateInventoryLevelSchema,
} from '@/db/schemas/ims/inventory_levels.schema';

export const create = oc
  .input(insertInventoryLevelSchema)
  .output(inventoryLevelSchema);
export const list = oc.output(z.array(inventoryLevelSchema));
export const view = oc.input(z.uuid()).output(inventoryLevelSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateInventoryLevelSchema }))
  .output(inventoryLevelSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
