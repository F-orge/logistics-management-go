import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingDocument,
  removeBillingDocument,
  selectBillingDocument,
  updateBillingDocument,
} from '@/actions/billing/documents';
import {
  billingDocumentInsertSchema,
  billingDocumentSchema,
  billingDocumentUpdateSchema,
} from '@/schemas/billing/document';

export const billingDocumentQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.documents', page, perPage],
    queryFn: () =>
      selectBillingDocument({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingDocumentCreateMutationOption = mutationOptions<
  z.infer<typeof billingDocumentSchema>,
  void,
  z.infer<typeof billingDocumentInsertSchema>
>({
  mutationFn: (value) => createBillingDocument({ data: value }),
});

export const billingDocumentUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingDocumentSchema>,
    void,
    z.infer<typeof billingDocumentUpdateSchema>
  >({
    mutationFn: (value) => updateBillingDocument({ data: { id, value } }),
  });

export const billingDocumentRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingDocument({ data: { id } }),
});
