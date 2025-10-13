import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsInventoryStockInsertSchema,
  wmsInventoryStockSchema,
  wmsInventoryStockUpdateSchema,
} from '@/schemas/wms/inventory_stock';

export const paginateInventoryStockContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsInventoryStockSchema),
        sort: sortTransformer(wmsInventoryStockSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryStockSchema));

export const rangeInventoryStockContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsInventoryStockSchema),
        sort: sortTransformer(wmsInventoryStockSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryStockSchema));

export const inInventoryStockContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsInventoryStockSchema));

export const createInventoryStockContract = oc
  .input(wmsInventoryStockInsertSchema)
  .output(wmsInventoryStockSchema);

export const updateInventoryStockContract = oc
  .input(z.object({ id: z.uuid(), value: wmsInventoryStockUpdateSchema }))
  .output(wmsInventoryStockSchema);

export const deleteInventoryStockContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
