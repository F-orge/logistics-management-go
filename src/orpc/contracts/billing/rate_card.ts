import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingRateCardInsertSchema,
  billingRateCardSchema,
  billingRateCardUpdateSchema,
} from '@/schemas/billing/rate_card';

export const paginateRateCardContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingRateCardSchema),
        sort: sortTransformer(billingRateCardSchema),
      }),
    ),
  )
  .output(z.array(billingRateCardSchema));

export const rangeRateCardContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingRateCardSchema),
        sort: sortTransformer(billingRateCardSchema),
      }),
    ),
  )
  .output(z.array(billingRateCardSchema));

export const inRateCardContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingRateCardSchema));

export const createRateCardContract = oc
  .input(billingRateCardInsertSchema)
  .output(billingRateCardSchema);

export const updateRateCardContract = oc
  .input(z.object({ id: z.uuid(), value: billingRateCardUpdateSchema }))
  .output(billingRateCardSchema);

export const deleteRateCardContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
