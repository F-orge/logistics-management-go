import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsProductInsertSchema,
  wmsProductSchema,
  wmsProductUpdateSchema,
} from '@/schemas/wms/product';

export const paginateProductContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsProductSchema),
        sort: sortTransformer(wmsProductSchema),
      }),
    ),
  )
  .output(z.array(wmsProductSchema));

export const rangeProductContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsProductSchema),
        sort: sortTransformer(wmsProductSchema),
      }),
    ),
  )
  .output(z.array(wmsProductSchema));

export const inProductContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsProductSchema));

export const createProductContract = oc
  .input(wmsProductInsertSchema)
  .output(wmsProductSchema);

export const updateProductContract = oc
  .input(z.object({ id: z.uuid(), value: wmsProductUpdateSchema }))
  .output(wmsProductSchema);

export const deleteProductContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
