import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsPartnerInvoice,
  removeTmsPartnerInvoice,
  selectTmsPartnerInvoice,
  updateTmsPartnerInvoice,
} from '@/actions/tms/partnerInvoices';
import {
  tmsPartnerInvoiceInsertSchema,
  tmsPartnerInvoiceSchema,
  tmsPartnerInvoiceUpdateSchema,
} from '@/schemas/tms/partner_invoice';

export const tmsPartnerInvoiceQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.partnerInvoices', page, perPage],
    queryFn: () =>
      selectTmsPartnerInvoice({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsPartnerInvoiceCreateMutationOption = mutationOptions<
  z.infer<typeof tmsPartnerInvoiceSchema>,
  void,
  z.infer<typeof tmsPartnerInvoiceInsertSchema>
>({
  mutationFn: (value) => createTmsPartnerInvoice({ data: value }),
});

export const tmsPartnerInvoiceUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsPartnerInvoiceSchema>,
    void,
    z.infer<typeof tmsPartnerInvoiceUpdateSchema>
  >({
    mutationFn: (value) => updateTmsPartnerInvoice({ data: { id, value } }),
  });

export const tmsPartnerInvoiceRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsPartnerInvoice({ data: { id } }),
});
