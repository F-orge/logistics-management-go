import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsCarrierRateInsertSchema,
  tmsCarrierRateSchema,
  tmsCarrierRateUpdateSchema,
} from '@/schemas/tms/carrier_rate';

export const paginateCarrierRateContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsCarrierRateSchema),
        sort: sortTransformer(tmsCarrierRateSchema),
      }),
    ),
  )
  .output(z.array(tmsCarrierRateSchema));

export const rangeCarrierRateContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsCarrierRateSchema),
        sort: sortTransformer(tmsCarrierRateSchema),
      }),
    ),
  )
  .output(z.array(tmsCarrierRateSchema));

export const inCarrierRateContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsCarrierRateSchema));

export const createCarrierRateContract = oc
  .input(tmsCarrierRateInsertSchema)
  .output(tmsCarrierRateSchema);

export const updateCarrierRateContract = oc
  .input(z.object({ id: z.uuid(), value: tmsCarrierRateUpdateSchema }))
  .output(tmsCarrierRateSchema);

export const deleteCarrierRateContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
