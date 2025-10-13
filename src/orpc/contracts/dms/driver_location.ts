import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  dmsDriverLocationInsertSchema,
  dmsDriverLocationSchema,
  dmsDriverLocationUpdateSchema,
} from '@/schemas/dms/driver_location';

export const paginateDriverLocationContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(dmsDriverLocationSchema),
        sort: sortTransformer(dmsDriverLocationSchema),
      }),
    ),
  )
  .output(z.array(dmsDriverLocationSchema));

export const rangeDriverLocationContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(dmsDriverLocationSchema),
        sort: sortTransformer(dmsDriverLocationSchema),
      }),
    ),
  )
  .output(z.array(dmsDriverLocationSchema));

export const inDriverLocationContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(dmsDriverLocationSchema));

export const createDriverLocationContract = oc
  .input(dmsDriverLocationInsertSchema)
  .output(dmsDriverLocationSchema);

export const updateDriverLocationContract = oc
  .input(z.object({ id: z.uuid(), value: dmsDriverLocationUpdateSchema }))
  .output(dmsDriverLocationSchema);

export const deleteDriverLocationContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
