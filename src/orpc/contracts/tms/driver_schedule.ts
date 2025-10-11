import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsDriverScheduleInsertSchema,
  tmsDriverScheduleSchema,
  tmsDriverScheduleUpdateSchema,
} from '@/schemas/tms/driver_schedule';

export const paginateDriverScheduleContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsDriverScheduleSchema),
        sort: sortTransformer(tmsDriverScheduleSchema),
      }),
    ),
  )
  .output(z.array(tmsDriverScheduleSchema));

export const rangeDriverScheduleContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsDriverScheduleSchema),
        sort: sortTransformer(tmsDriverScheduleSchema),
      }),
    ),
  )
  .output(z.array(tmsDriverScheduleSchema));

export const inDriverScheduleContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsDriverScheduleSchema));

export const createDriverScheduleContract = oc
  .input(tmsDriverScheduleInsertSchema)
  .output(tmsDriverScheduleSchema);

export const updateDriverScheduleContract = oc
  .input(z.object({ id: z.uuid(), value: tmsDriverScheduleUpdateSchema }))
  .output(tmsDriverScheduleSchema);

export const deleteDriverScheduleContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
