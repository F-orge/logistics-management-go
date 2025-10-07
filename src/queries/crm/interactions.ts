import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmInteraction,
  removeCrmInteraction,
  selectCrmInteraction,
  updateCrmInteraction,
} from '@/actions/crm/interactions';
import {
  crmInteractionInsertSchema,
  crmInteractionSchema,
  crmInteractionUpdateSchema,
} from '@/schemas/crm/interactions';

export const crmInteractionQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.interactions', page, perPage],
    queryFn: () =>
      selectCrmInteraction({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmInteractionCreateMutationOption = mutationOptions<
  z.infer<typeof crmInteractionSchema>,
  void,
  z.infer<typeof crmInteractionInsertSchema>
>({
  mutationFn: (value) => createCrmInteraction({ data: value }),
});

export const crmInteractionUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmInteractionSchema>,
    void,
    z.infer<typeof crmInteractionUpdateSchema>
  >({
    mutationFn: (value) => updateCrmInteraction({ data: { id, value } }),
  });

export const crmInteractionRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmInteraction({ data: { id } }),
});