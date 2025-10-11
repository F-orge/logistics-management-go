import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingDisputeInsertSchema,
  billingDisputeSchema,
  billingDisputeUpdateSchema,
} from '@/schemas/billing/dispute';

export const paginateDisputeContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingDisputeSchema),
        sort: sortTransformer(billingDisputeSchema),
      }),
    ),
  )
  .output(z.array(billingDisputeSchema));

export const rangeDisputeContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingDisputeSchema),
        sort: sortTransformer(billingDisputeSchema),
      }),
    ),
  )
  .output(z.array(billingDisputeSchema));

export const inDisputeContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingDisputeSchema));

export const createDisputeContract = oc
  .input(billingDisputeInsertSchema)
  .output(billingDisputeSchema);

export const updateDisputeContract = oc
  .input(z.object({ id: z.uuid(), value: billingDisputeUpdateSchema }))
  .output(billingDisputeSchema);

export const deleteDisputeContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
