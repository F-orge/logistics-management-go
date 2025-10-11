import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsInventoryBatchInsertSchema,
  wmsInventoryBatchSchema,
  wmsInventoryBatchUpdateSchema,
} from '@/schemas/wms/inventory_batch';

export const paginateInventoryBatchContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsInventoryBatchSchema),
        sort: sortTransformer(wmsInventoryBatchSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryBatchSchema));

export const rangeInventoryBatchContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsInventoryBatchSchema),
        sort: sortTransformer(wmsInventoryBatchSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryBatchSchema));

export const inInventoryBatchContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsInventoryBatchSchema));

export const createInventoryBatchContract = oc
  .input(wmsInventoryBatchInsertSchema)
  .output(wmsInventoryBatchSchema);

export const updateInventoryBatchContract = oc
  .input(z.object({ id: z.uuid(), value: wmsInventoryBatchUpdateSchema }))
  .output(wmsInventoryBatchSchema);

export const deleteInventoryBatchContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
