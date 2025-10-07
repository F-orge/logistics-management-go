import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmTagging,
  removeCrmTagging,
  selectCrmTagging,
  updateCrmTagging,
} from '@/actions/crm/taggings';
import {
  crmTaggingInsertSchema,
  crmTaggingSchema,
  crmTaggingUpdateSchema,
} from '@/schemas/crm/tagging';

export const crmTaggingQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.taggings', page, perPage],
    queryFn: () =>
      selectCrmTagging({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmTaggingCreateMutationOption = mutationOptions<
  z.infer<typeof crmTaggingSchema>,
  void,
  z.infer<typeof crmTaggingInsertSchema>
>({
  mutationFn: (value) => createCrmTagging({ data: value }),
});

export const crmTaggingUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmTaggingSchema>,
    void,
    z.infer<typeof crmTaggingUpdateSchema>
  >({
    mutationFn: (value) => updateCrmTagging({ data: { id, value } }),
  });

export const crmTaggingRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmTagging({ data: { id } }),
});
