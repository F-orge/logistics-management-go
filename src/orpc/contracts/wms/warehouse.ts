import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsWarehouseInsertSchema,
  wmsWarehouseSchema,
  wmsWarehouseUpdateSchema,
} from '@/schemas/wms/warehouse';

export const paginateWarehouseContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsWarehouseSchema),
        sort: sortTransformer(wmsWarehouseSchema),
      }),
    ),
  )
  .output(z.array(wmsWarehouseSchema));

export const rangeWarehouseContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsWarehouseSchema),
        sort: sortTransformer(wmsWarehouseSchema),
      }),
    ),
  )
  .output(z.array(wmsWarehouseSchema));

export const inWarehouseContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsWarehouseSchema));

export const createWarehouseContract = oc
  .input(wmsWarehouseInsertSchema)
  .output(wmsWarehouseSchema);

export const updateWarehouseContract = oc
  .input(z.object({ id: z.uuid(), value: wmsWarehouseUpdateSchema }))
  .output(wmsWarehouseSchema);

export const deleteWarehouseContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
