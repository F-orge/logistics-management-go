import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmInvoiceItem,
  removeCrmInvoiceItem,
  selectCrmInvoiceItem,
  updateCrmInvoiceItem,
} from '@/actions/crm/invoiceItems';
import {
  crmInvoiceItemInsertSchema,
  crmInvoiceItemSchema,
  crmInvoiceItemUpdateSchema,
} from '@/schemas/crm/invoice_items';

export const crmInvoiceItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.invoiceItems', page, perPage],
    queryFn: () =>
      selectCrmInvoiceItem({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmInvoiceItemCreateMutationOption = mutationOptions<
  z.infer<typeof crmInvoiceItemSchema>,
  void,
  z.infer<typeof crmInvoiceItemInsertSchema>
>({
  mutationFn: (value) => createCrmInvoiceItem({ data: value }),
});

export const crmInvoiceItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmInvoiceItemSchema>,
    void,
    z.infer<typeof crmInvoiceItemUpdateSchema>
  >({
    mutationFn: (value) => updateCrmInvoiceItem({ data: { id, value } }),
  });

export const crmInvoiceItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmInvoiceItem({ data: { id } }),
});