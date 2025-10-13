import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingAccountTransactionInsertSchema,
  billingAccountTransactionSchema,
  billingAccountTransactionUpdateSchema,
} from '@/schemas/billing/account_transaction';

export const paginateAccountTransactionContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingAccountTransactionSchema),
        sort: sortTransformer(billingAccountTransactionSchema),
      }),
    ),
  )
  .output(z.array(billingAccountTransactionSchema));

export const rangeAccountTransactionContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingAccountTransactionSchema),
        sort: sortTransformer(billingAccountTransactionSchema),
      }),
    ),
  )
  .output(z.array(billingAccountTransactionSchema));

export const inAccountTransactionContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingAccountTransactionSchema));

export const createAccountTransactionContract = oc
  .input(billingAccountTransactionInsertSchema)
  .output(billingAccountTransactionSchema);

export const updateAccountTransactionContract = oc
  .input(
    z.object({ id: z.uuid(), value: billingAccountTransactionUpdateSchema }),
  )
  .output(billingAccountTransactionSchema);

export const deleteAccountTransactionContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
