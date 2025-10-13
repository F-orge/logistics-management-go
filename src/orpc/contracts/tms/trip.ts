import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsTripInsertSchema,
  tmsTripSchema,
  tmsTripUpdateSchema,
} from '@/schemas/tms/trip';

export const paginateTripContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsTripSchema),
        sort: sortTransformer(tmsTripSchema),
      }),
    ),
  )
  .output(z.array(tmsTripSchema));

export const rangeTripContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsTripSchema),
        sort: sortTransformer(tmsTripSchema),
      }),
    ),
  )
  .output(z.array(tmsTripSchema));

export const inTripContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsTripSchema));

export const createTripContract = oc
  .input(tmsTripInsertSchema)
  .output(tmsTripSchema);

export const updateTripContract = oc
  .input(z.object({ id: z.uuid(), value: tmsTripUpdateSchema }))
  .output(tmsTripSchema);

export const deleteTripContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
