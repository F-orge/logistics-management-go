import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsPickBatchInsertSchema,
  wmsPickBatchSchema,
  wmsPickBatchUpdateSchema,
} from '@/schemas/wms/pick_batch';

export const paginatePickBatchContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsPickBatchSchema),
        sort: sortTransformer(wmsPickBatchSchema),
      }),
    ),
  )
  .output(z.array(wmsPickBatchSchema));

export const rangePickBatchContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsPickBatchSchema),
        sort: sortTransformer(wmsPickBatchSchema),
      }),
    ),
  )
  .output(z.array(wmsPickBatchSchema));

export const inPickBatchContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsPickBatchSchema));

export const createPickBatchContract = oc
  .input(wmsPickBatchInsertSchema)
  .output(wmsPickBatchSchema);

export const updatePickBatchContract = oc
  .input(z.object({ id: z.uuid(), value: wmsPickBatchUpdateSchema }))
  .output(wmsPickBatchSchema);

export const deletePickBatchContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
