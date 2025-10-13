import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsStockTransferInsertSchema,
  wmsStockTransferSchema,
  wmsStockTransferUpdateSchema,
} from '@/schemas/wms/stock_transfer';

export const paginateStockTransferContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsStockTransferSchema),
        sort: sortTransformer(wmsStockTransferSchema),
      }),
    ),
  )
  .output(z.array(wmsStockTransferSchema));

export const rangeStockTransferContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsStockTransferSchema),
        sort: sortTransformer(wmsStockTransferSchema),
      }),
    ),
  )
  .output(z.array(wmsStockTransferSchema));

export const inStockTransferContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsStockTransferSchema));

export const createStockTransferContract = oc
  .input(wmsStockTransferInsertSchema)
  .output(wmsStockTransferSchema);

export const updateStockTransferContract = oc
  .input(z.object({ id: z.uuid(), value: wmsStockTransferUpdateSchema }))
  .output(wmsStockTransferSchema);

export const deleteStockTransferContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
