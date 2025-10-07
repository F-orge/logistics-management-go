import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingRateCard,
  removeBillingRateCard,
  selectBillingRateCard,
  updateBillingRateCard,
} from '@/actions/billing/rateCards';
import {
  billingRateCardInsertSchema,
  billingRateCardSchema,
  billingRateCardUpdateSchema,
} from '@/schemas/billing/rate_card';

export const billingRateCardQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.rateCards', page, perPage],
    queryFn: () =>
      selectBillingRateCard({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingRateCardCreateMutationOption = mutationOptions<
  z.infer<typeof billingRateCardSchema>,
  void,
  z.infer<typeof billingRateCardInsertSchema>
>({
  mutationFn: (value) => createBillingRateCard({ data: value }),
});

export const billingRateCardUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingRateCardSchema>,
    void,
    z.infer<typeof billingRateCardUpdateSchema>
  >({
    mutationFn: (value) => updateBillingRateCard({ data: { id, value } }),
  });

export const billingRateCardRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingRateCard({ data: { id } }),
});