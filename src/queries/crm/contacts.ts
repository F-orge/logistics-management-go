import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmContact,
  removeCrmContact,
  selectCrmContact,
  updateCrmContact,
} from '@/actions/crm/contacts';
import {
  crmContactInsertSchema,
  crmContactSchema,
  crmContactUpdateSchema,
} from '@/schemas/crm/contacts';

export const crmContactQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.contacts', page, perPage],
    queryFn: () =>
      selectCrmContact({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmContactCreateMutationOption = mutationOptions<
  z.infer<typeof crmContactSchema>,
  void,
  z.infer<typeof crmContactInsertSchema>
>({
  mutationFn: (value) => createCrmContact({ data: value }),
});

export const crmContactUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmContactSchema>,
    void,
    z.infer<typeof crmContactUpdateSchema>
  >({
    mutationFn: (value) => updateCrmContact({ data: { id, value } }),
  });

export const crmContactRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmContact({ data: { id } }),
});
