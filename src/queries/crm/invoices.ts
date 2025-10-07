import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmInvoice,
  removeCrmInvoice,
  selectCrmInvoice,
  updateCrmInvoice,
} from '@/actions/crm/invoices';
import {
  crmInvoiceInsertSchema,
  crmInvoiceSchema,
  crmInvoiceUpdateSchema,
} from '@/schemas/crm/invoices';

export const crmInvoiceQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.invoices', page, perPage],
    queryFn: () =>
      selectCrmInvoice({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmInvoiceCreateMutationOption = mutationOptions<
  z.infer<typeof crmInvoiceSchema>,
  void,
  z.infer<typeof crmInvoiceInsertSchema>
>({
  mutationFn: (value) => createCrmInvoice({ data: value }),
});

export const crmInvoiceUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmInvoiceSchema>,
    void,
    z.infer<typeof crmInvoiceUpdateSchema>
  >({
    mutationFn: (value) => updateCrmInvoice({ data: { id, value } }),
  });

export const crmInvoiceRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmInvoice({ data: { id } }),
});
