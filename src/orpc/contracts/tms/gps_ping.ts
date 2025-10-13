import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsGpsPingInsertSchema,
  tmsGpsPingSchema,
  tmsGpsPingUpdateSchema,
} from '@/schemas/tms/gps_ping';

export const paginateGpsPingContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsGpsPingSchema),
        sort: sortTransformer(tmsGpsPingSchema),
      }),
    ),
  )
  .output(z.array(tmsGpsPingSchema));

export const rangeGpsPingContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsGpsPingSchema),
        sort: sortTransformer(tmsGpsPingSchema),
      }),
    ),
  )
  .output(z.array(tmsGpsPingSchema));

export const inGpsPingContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsGpsPingSchema));

export const createGpsPingContract = oc
  .input(tmsGpsPingInsertSchema)
  .output(tmsGpsPingSchema);

export const updateGpsPingContract = oc
  .input(z.object({ id: z.uuid(), value: tmsGpsPingUpdateSchema }))
  .output(tmsGpsPingSchema);

export const deleteGpsPingContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
