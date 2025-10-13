import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingRateRuleInsertSchema,
  billingRateRuleSchema,
  billingRateRuleUpdateSchema,
} from '@/schemas/billing/rate_rule';

export const paginateRateRuleContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingRateRuleSchema),
        sort: sortTransformer(billingRateRuleSchema),
      }),
    ),
  )
  .output(z.array(billingRateRuleSchema));

export const rangeRateRuleContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingRateRuleSchema),
        sort: sortTransformer(billingRateRuleSchema),
      }),
    ),
  )
  .output(z.array(billingRateRuleSchema));

export const inRateRuleContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingRateRuleSchema));

export const createRateRuleContract = oc
  .input(billingRateRuleInsertSchema)
  .output(billingRateRuleSchema);

export const updateRateRuleContract = oc
  .input(z.object({ id: z.uuid(), value: billingRateRuleUpdateSchema }))
  .output(billingRateRuleSchema);

export const deleteRateRuleContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
