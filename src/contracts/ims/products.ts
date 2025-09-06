import { oc } from '@orpc/contract';
import z from 'zod';
import {
  productSchema,
  insertProductSchema,
  updateProductSchema,
} from '@/db/schemas/ims/products.schema';

export const create = oc.input(insertProductSchema).output(productSchema);
export const list = oc.output(z.array(productSchema));
export const view = oc.input(z.uuid()).output(productSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateProductSchema }))
  .output(productSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
