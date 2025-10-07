import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingPayment,
  removeBillingPayment,
  selectBillingPayment,
  updateBillingPayment,
} from '@/actions/billing/payments';
import {
  billingPaymentInsertSchema,
  billingPaymentSchema,
  billingPaymentUpdateSchema,
} from '@/schemas/billing/payment';

export const billingPaymentQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.payments', page, perPage],
    queryFn: () =>
      selectBillingPayment({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingPaymentCreateMutationOption = mutationOptions<
  z.infer<typeof billingPaymentSchema>,
  void,
  z.infer<typeof billingPaymentInsertSchema>
>({
  mutationFn: (value) => createBillingPayment({ data: value }),
});

export const billingPaymentUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingPaymentSchema>,
    void,
    z.infer<typeof billingPaymentUpdateSchema>
  >({
    mutationFn: (value) => updateBillingPayment({ data: { id, value } }),
  });

export const billingPaymentRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingPayment({ data: { id } }),
});