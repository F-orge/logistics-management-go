import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingCreditNote,
  removeBillingCreditNote,
  selectBillingCreditNote,
  updateBillingCreditNote,
} from '@/actions/billing/creditNotes';
import {
  billingCreditNoteInsertSchema,
  billingCreditNoteSchema,
  billingCreditNoteUpdateSchema,
} from '@/schemas/billing/credit_note';

export const billingCreditNoteQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.creditNotes', page, perPage],
    queryFn: () =>
      selectBillingCreditNote({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingCreditNoteCreateMutationOption = mutationOptions<
  z.infer<typeof billingCreditNoteSchema>,
  void,
  z.infer<typeof billingCreditNoteInsertSchema>
>({
  mutationFn: (value) => createBillingCreditNote({ data: value }),
});

export const billingCreditNoteUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingCreditNoteSchema>,
    void,
    z.infer<typeof billingCreditNoteUpdateSchema>
  >({
    mutationFn: (value) => updateBillingCreditNote({ data: { id, value } }),
  });

export const billingCreditNoteRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingCreditNote({ data: { id } }),
});
