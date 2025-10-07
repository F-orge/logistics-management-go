import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmCase,
  removeCrmCase,
  selectCrmCase,
  updateCrmCase,
} from '@/actions/crm/cases';
import {
  crmCaseInsertSchema,
  crmCaseSchema,
  crmCaseUpdateSchema,
} from '@/schemas/crm/cases';

export const crmCaseQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.cases', page, perPage],
    queryFn: () =>
      selectCrmCase({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmCaseCreateMutationOption = mutationOptions<
  z.infer<typeof crmCaseSchema>,
  void,
  z.infer<typeof crmCaseInsertSchema>
>({
  mutationFn: (value) => createCrmCase({ data: value }),
});

export const crmCaseUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmCaseSchema>,
    void,
    z.infer<typeof crmCaseUpdateSchema>
  >({
    mutationFn: (value) => updateCrmCase({ data: { id, value } }),
  });

export const crmCaseRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmCase({ data: { id } }),
});
