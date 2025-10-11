import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmProductInsertSchema,
  crmProductSchema,
  crmProductUpdateSchema,
} from '@/schemas/crm/products';

export const paginateProductContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmProductSchema),
        sort: sortTransformer(crmProductSchema),
      }),
    ),
  )
  .output(z.array(crmProductSchema));

export const rangeProductContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmProductSchema),
        sort: sortTransformer(crmProductSchema),
      }),
    ),
  )
  .output(z.array(crmProductSchema));

export const inProductContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(crmProductSchema));

export const createProductContract = oc
  .input(crmProductInsertSchema)
  .output(crmProductSchema);

export const updateProductContract = oc
  .input(z.object({ id: z.uuid(), value: crmProductUpdateSchema }))
  .output(crmProductSchema);

export const deleteProductContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
