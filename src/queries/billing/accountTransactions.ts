import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingAccountTransaction,
  removeBillingAccountTransaction,
  selectBillingAccountTransaction,
  updateBillingAccountTransaction,
} from '@/actions/billing/accountTransactions';
import {
  billingAccountTransactionInsertSchema,
  billingAccountTransactionSchema,
  billingAccountTransactionUpdateSchema,
} from '@/schemas/billing/account_transaction';

export const billingAccountTransactionQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.accountTransactions', page, perPage],
    queryFn: () =>
      selectBillingAccountTransaction({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingAccountTransactionCreateMutationOption = mutationOptions<
  z.infer<typeof billingAccountTransactionSchema>,
  void,
  z.infer<typeof billingAccountTransactionInsertSchema>
>({
  mutationFn: (value) => createBillingAccountTransaction({ data: value }),
});

export const billingAccountTransactionUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingAccountTransactionSchema>,
    void,
    z.infer<typeof billingAccountTransactionUpdateSchema>
  >({
    mutationFn: (value) => updateBillingAccountTransaction({ data: { id, value } }),
  });

export const billingAccountTransactionRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingAccountTransaction({ data: { id } }),
});