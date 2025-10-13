import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsReturnInsertSchema,
  wmsReturnSchema,
  wmsReturnUpdateSchema,
} from '@/schemas/wms/return';

export const paginateReturnContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsReturnSchema),
        sort: sortTransformer(wmsReturnSchema),
      }),
    ),
  )
  .output(z.array(wmsReturnSchema));

export const rangeReturnContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsReturnSchema),
        sort: sortTransformer(wmsReturnSchema),
      }),
    ),
  )
  .output(z.array(wmsReturnSchema));

export const inReturnContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsReturnSchema));

export const createReturnContract = oc
  .input(wmsReturnInsertSchema)
  .output(wmsReturnSchema);

export const updateReturnContract = oc
  .input(z.object({ id: z.uuid(), value: wmsReturnUpdateSchema }))
  .output(wmsReturnSchema);

export const deleteReturnContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
