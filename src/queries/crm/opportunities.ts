import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmOpportunity,
  removeCrmOpportunity,
  selectCrmOpportunity,
  updateCrmOpportunity,
} from '@/actions/crm/opportunities';
import {
  crmOpportunityInsertSchema,
  crmOpportunitySchema,
  crmOpportunityUpdateSchema,
} from '@/schemas/crm/opportunities';

export const crmOpportunityQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.opportunities', page, perPage],
    queryFn: () =>
      selectCrmOpportunity({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmOpportunityCreateMutationOption = mutationOptions<
  z.infer<typeof crmOpportunitySchema>,
  void,
  z.infer<typeof crmOpportunityInsertSchema>
>({
  mutationFn: (value) => createCrmOpportunity({ data: value }),
});

export const crmOpportunityUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmOpportunitySchema>,
    void,
    z.infer<typeof crmOpportunityUpdateSchema>
  >({
    mutationFn: (value) => updateCrmOpportunity({ data: { id, value } }),
  });

export const crmOpportunityRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmOpportunity({ data: { id } }),
});