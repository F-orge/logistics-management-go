import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsCarrierInsertSchema,
  tmsCarrierSchema,
  tmsCarrierUpdateSchema,
} from '@/schemas/tms/carrier';

export const paginateCarrierContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsCarrierSchema),
        sort: sortTransformer(tmsCarrierSchema),
      }),
    ),
  )
  .output(z.array(tmsCarrierSchema));

export const rangeCarrierContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsCarrierSchema),
        sort: sortTransformer(tmsCarrierSchema),
      }),
    ),
  )
  .output(z.array(tmsCarrierSchema));

export const inCarrierContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsCarrierSchema));

export const createCarrierContract = oc
  .input(tmsCarrierInsertSchema)
  .output(tmsCarrierSchema);

export const updateCarrierContract = oc
  .input(z.object({ id: z.uuid(), value: tmsCarrierUpdateSchema }))
  .output(tmsCarrierSchema);

export const deleteCarrierContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
