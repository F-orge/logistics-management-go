import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsTripStopInsertSchema,
  tmsTripStopSchema,
  tmsTripStopUpdateSchema,
} from '@/schemas/tms/trip_stop';

export const paginateTripStopContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsTripStopSchema),
        sort: sortTransformer(tmsTripStopSchema),
      }),
    ),
  )
  .output(z.array(tmsTripStopSchema));

export const rangeTripStopContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsTripStopSchema),
        sort: sortTransformer(tmsTripStopSchema),
      }),
    ),
  )
  .output(z.array(tmsTripStopSchema));

export const inTripStopContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsTripStopSchema));

export const createTripStopContract = oc
  .input(tmsTripStopInsertSchema)
  .output(tmsTripStopSchema);

export const updateTripStopContract = oc
  .input(z.object({ id: z.uuid(), value: tmsTripStopUpdateSchema }))
  .output(tmsTripStopSchema);

export const deleteTripStopContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
