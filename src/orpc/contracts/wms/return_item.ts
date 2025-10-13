import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsReturnItemInsertSchema,
  wmsReturnItemSchema,
  wmsReturnItemUpdateSchema,
} from '@/schemas/wms/return_item';

export const paginateReturnItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsReturnItemSchema),
        sort: sortTransformer(wmsReturnItemSchema),
      }),
    ),
  )
  .output(z.array(wmsReturnItemSchema));

export const rangeReturnItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsReturnItemSchema),
        sort: sortTransformer(wmsReturnItemSchema),
      }),
    ),
  )
  .output(z.array(wmsReturnItemSchema));

export const inReturnItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsReturnItemSchema));

export const createReturnItemContract = oc
  .input(wmsReturnItemInsertSchema)
  .output(wmsReturnItemSchema);

export const updateReturnItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsReturnItemUpdateSchema }))
  .output(wmsReturnItemSchema);

export const deleteReturnItemContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
