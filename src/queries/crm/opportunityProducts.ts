import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmOpportunityProduct,
  removeCrmOpportunityProduct,
  selectCrmOpportunityProduct,
  updateCrmOpportunityProduct,
} from '@/actions/crm/opportunityProducts';
import {
  crmOpportunityProductInsertSchema,
  crmOpportunityProductSchema,
  crmOpportunityProductUpdateSchema,
} from '@/schemas/crm/opportunity_products';

export const crmOpportunityProductQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.opportunityProducts', page, perPage],
    queryFn: () =>
      selectCrmOpportunityProduct({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmOpportunityProductCreateMutationOption = mutationOptions<
  z.infer<typeof crmOpportunityProductSchema>,
  void,
  z.infer<typeof crmOpportunityProductInsertSchema>
>({
  mutationFn: (value) => createCrmOpportunityProduct({ data: value }),
});

export const crmOpportunityProductUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmOpportunityProductSchema>,
    void,
    z.infer<typeof crmOpportunityProductUpdateSchema>
  >({
    mutationFn: (value) => updateCrmOpportunityProduct({ data: { id, value } }),
  });

export const crmOpportunityProductRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmOpportunityProduct({ data: { id } }),
});