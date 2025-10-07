import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingInvoiceLineItem,
  removeBillingInvoiceLineItem,
  selectBillingInvoiceLineItem,
  updateBillingInvoiceLineItem,
} from '@/actions/billing/invoiceLineItems';
import {
  billingInvoiceLineItemInsertSchema,
  billingInvoiceLineItemSchema,
  billingInvoiceLineItemUpdateSchema,
} from '@/schemas/billing/invoice_line_item';

export const billingInvoiceLineItemQueryOption = (
  page: number,
  perPage: number,
) =>
  queryOptions({
    queryKey: ['billing.invoiceLineItems', page, perPage],
    queryFn: () =>
      selectBillingInvoiceLineItem({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingInvoiceLineItemCreateMutationOption = mutationOptions<
  z.infer<typeof billingInvoiceLineItemSchema>,
  void,
  z.infer<typeof billingInvoiceLineItemInsertSchema>
>({
  mutationFn: (value) => createBillingInvoiceLineItem({ data: value }),
});

export const billingInvoiceLineItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingInvoiceLineItemSchema>,
    void,
    z.infer<typeof billingInvoiceLineItemUpdateSchema>
  >({
    mutationFn: (value) =>
      updateBillingInvoiceLineItem({ data: { id, value } }),
  });

export const billingInvoiceLineItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingInvoiceLineItem({ data: { id } }),
});
