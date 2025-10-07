import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingClientAccount,
  removeBillingClientAccount,
  selectBillingClientAccount,
  updateBillingClientAccount,
} from '@/actions/billing/clientAccounts';
import {
  billingClientAccountInsertSchema,
  billingClientAccountSchema,
  billingClientAccountUpdateSchema,
} from '@/schemas/billing/client_account';

export const billingClientAccountQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.clientAccounts', page, perPage],
    queryFn: () =>
      selectBillingClientAccount({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingClientAccountCreateMutationOption = mutationOptions<
  z.infer<typeof billingClientAccountSchema>,
  void,
  z.infer<typeof billingClientAccountInsertSchema>
>({
  mutationFn: (value) => createBillingClientAccount({ data: value }),
});

export const billingClientAccountUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingClientAccountSchema>,
    void,
    z.infer<typeof billingClientAccountUpdateSchema>
  >({
    mutationFn: (value) => updateBillingClientAccount({ data: { id, value } }),
  });

export const billingClientAccountRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingClientAccount({ data: { id } }),
});