import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingPaymentInsertSchema,
  billingPaymentSchema,
  billingPaymentUpdateSchema,
} from '@/schemas/billing/payment';

export const paginatePaymentContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingPaymentSchema),
        sort: sortTransformer(billingPaymentSchema),
      }),
    ),
  )
  .output(z.array(billingPaymentSchema));

export const rangePaymentContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingPaymentSchema),
        sort: sortTransformer(billingPaymentSchema),
      }),
    ),
  )
  .output(z.array(billingPaymentSchema));

export const inPaymentContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingPaymentSchema));

export const createPaymentContract = oc
  .input(billingPaymentInsertSchema)
  .output(billingPaymentSchema);

export const updatePaymentContract = oc
  .input(z.object({ id: z.uuid(), value: billingPaymentUpdateSchema }))
  .output(billingPaymentSchema);

export const deletePaymentContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
