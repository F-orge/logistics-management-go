import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingDispute,
  removeBillingDispute,
  selectBillingDispute,
  updateBillingDispute,
} from '@/actions/billing/disputes';
import {
  billingDisputeInsertSchema,
  billingDisputeSchema,
  billingDisputeUpdateSchema,
} from '@/schemas/billing/dispute';

export const billingDisputeQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.disputes', page, perPage],
    queryFn: () =>
      selectBillingDispute({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingDisputeCreateMutationOption = mutationOptions<
  z.infer<typeof billingDisputeSchema>,
  void,
  z.infer<typeof billingDisputeInsertSchema>
>({
  mutationFn: (value) => createBillingDispute({ data: value }),
});

export const billingDisputeUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingDisputeSchema>,
    void,
    z.infer<typeof billingDisputeUpdateSchema>
  >({
    mutationFn: (value) => updateBillingDispute({ data: { id, value } }),
  });

export const billingDisputeRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingDispute({ data: { id } }),
});