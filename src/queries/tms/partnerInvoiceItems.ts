import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsPartnerInvoiceItem,
  removeTmsPartnerInvoiceItem,
  selectTmsPartnerInvoiceItem,
  updateTmsPartnerInvoiceItem,
} from '@/actions/tms/partnerInvoiceItems';
import {
  tmsPartnerInvoiceItemInsertSchema,
  tmsPartnerInvoiceItemSchema,
  tmsPartnerInvoiceItemUpdateSchema,
} from '@/schemas/tms/partner_invoice_item';

export const tmsPartnerInvoiceItemQueryOption = (
  page: number,
  perPage: number,
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoiceItems', page, perPage],
    queryFn: () =>
      selectTmsPartnerInvoiceItem({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsPartnerInvoiceItemCreateMutationOption = mutationOptions<
  z.infer<typeof tmsPartnerInvoiceItemSchema>,
  void,
  z.infer<typeof tmsPartnerInvoiceItemInsertSchema>
>({
  mutationFn: (value) => createTmsPartnerInvoiceItem({ data: value }),
});

export const tmsPartnerInvoiceItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsPartnerInvoiceItemSchema>,
    void,
    z.infer<typeof tmsPartnerInvoiceItemUpdateSchema>
  >({
    mutationFn: (value) => updateTmsPartnerInvoiceItem({ data: { id, value } }),
  });

export const tmsPartnerInvoiceItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsPartnerInvoiceItem({ data: { id } }),
});
