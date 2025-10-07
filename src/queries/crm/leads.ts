import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmLead,
  removeCrmLead,
  selectCrmLead,
  updateCrmLead,
} from '@/actions/crm/leads';
import {
  crmLeadInsertSchema,
  crmLeadSchema,
  crmLeadUpdateSchema,
} from '@/schemas/crm/leads';

export const crmLeadQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.leads', page, perPage],
    queryFn: () =>
      selectCrmLead({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmLeadCreateMutationOption = mutationOptions<
  z.infer<typeof crmLeadSchema>,
  void,
  z.infer<typeof crmLeadInsertSchema>
>({
  mutationFn: (value) => createCrmLead({ data: value }),
});

export const crmLeadUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmLeadSchema>,
    void,
    z.infer<typeof crmLeadUpdateSchema>
  >({
    mutationFn: (value) => updateCrmLead({ data: { id, value } }),
  });

export const crmLeadRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmLead({ data: { id } }),
});
