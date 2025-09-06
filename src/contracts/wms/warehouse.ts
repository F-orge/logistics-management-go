import { oc } from '@orpc/contract';
import z from 'zod';
import {
  warehouseSchema,
  insertWarehouseSchema,
  updateWarehouseSchema,
} from '@/db/schemas/wms/warehouse.schema';

export const create = oc.input(insertWarehouseSchema).output(warehouseSchema);
export const list = oc.output(z.array(warehouseSchema));
export const view = oc.input(z.uuid()).output(warehouseSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateWarehouseSchema }))
  .output(warehouseSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
