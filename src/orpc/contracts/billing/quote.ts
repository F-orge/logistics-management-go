import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingQuoteInsertSchema,
  billingQuoteSchema,
  billingQuoteUpdateSchema,
} from '@/schemas/billing/quote';

export const paginateQuoteContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingQuoteSchema),
        sort: sortTransformer(billingQuoteSchema),
      }),
    ),
  )
  .output(z.array(billingQuoteSchema));

export const rangeQuoteContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingQuoteSchema),
        sort: sortTransformer(billingQuoteSchema),
      }),
    ),
  )
  .output(z.array(billingQuoteSchema));

export const inQuoteContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingQuoteSchema));

export const createQuoteContract = oc
  .input(billingQuoteInsertSchema)
  .output(billingQuoteSchema);

export const updateQuoteContract = oc
  .input(z.object({ id: z.uuid(), value: billingQuoteUpdateSchema }))
  .output(billingQuoteSchema);

export const deleteQuoteContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
