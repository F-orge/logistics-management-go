import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmTag,
  removeCrmTag,
  selectCrmTag,
  updateCrmTag,
} from '@/actions/crm/tags';
import { insertTagSchema, updateTagSchema } from '@/db/schemas';
import { crmTagSchema } from '@/schemas/crm/tags';

export const crmTagQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.tags', page, perPage],
    queryFn: () =>
      selectCrmTag({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmTagCreateMutationOption = mutationOptions<
  z.infer<typeof crmTagSchema>,
  void,
  z.infer<typeof insertTagSchema>
>({
  mutationFn: (value) => createCrmTag({ data: value }),
});

export const crmTagUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmTagSchema>,
    void,
    z.infer<typeof updateTagSchema>
  >({
    mutationFn: (value) => updateCrmTag({ data: { id, value } }),
  });

export const crmTagRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmTag({ data: { id } }),
});
