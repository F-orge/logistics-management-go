import { oc } from '@orpc/contract';
import z from 'zod';
import {
  locationSchema,
  insertLocationSchema,
  updateLocationSchema,
} from '@/db/schemas/wms/locations.schema';

export const create = oc.input(insertLocationSchema).output(locationSchema);
export const list = oc.output(z.array(locationSchema));
export const view = oc.input(z.uuid()).output(locationSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateLocationSchema }))
  .output(locationSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
