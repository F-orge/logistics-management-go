import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingQuote,
  removeBillingQuote,
  selectBillingQuote,
  updateBillingQuote,
} from '@/actions/billing/quotes';
import {
  billingQuoteInsertSchema,
  billingQuoteSchema,
  billingQuoteUpdateSchema,
} from '@/schemas/billing/quote';

export const billingQuoteQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.quotes', page, perPage],
    queryFn: () =>
      selectBillingQuote({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingQuoteCreateMutationOption = mutationOptions<
  z.infer<typeof billingQuoteSchema>,
  void,
  z.infer<typeof billingQuoteInsertSchema>
>({
  mutationFn: (value) => createBillingQuote({ data: value }),
});

export const billingQuoteUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingQuoteSchema>,
    void,
    z.infer<typeof billingQuoteUpdateSchema>
  >({
    mutationFn: (value) => updateBillingQuote({ data: { id, value } }),
  });

export const billingQuoteRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingQuote({ data: { id } }),
});
