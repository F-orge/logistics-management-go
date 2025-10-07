import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingInvoice,
  removeBillingInvoice,
  selectBillingInvoice,
  updateBillingInvoice,
} from '@/actions/billing/invoices';
import {
  billingInvoiceInsertSchema,
  billingInvoiceSchema,
  billingInvoiceUpdateSchema,
} from '@/schemas/billing/invoice';

export const billingInvoiceQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.invoices', page, perPage],
    queryFn: () =>
      selectBillingInvoice({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingInvoiceCreateMutationOption = mutationOptions<
  z.infer<typeof billingInvoiceSchema>,
  void,
  z.infer<typeof billingInvoiceInsertSchema>
>({
  mutationFn: (value) => createBillingInvoice({ data: value }),
});

export const billingInvoiceUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingInvoiceSchema>,
    void,
    z.infer<typeof billingInvoiceUpdateSchema>
  >({
    mutationFn: (value) => updateBillingInvoice({ data: { id, value } }),
  });

export const billingInvoiceRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingInvoice({ data: { id } }),
});