import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsDriver,
  removeTmsDriver,
  selectTmsDriver,
  updateTmsDriver,
} from '@/actions/tms/drivers';
import {
  tmsDriverInsertSchema,
  tmsDriverSchema,
  tmsDriverUpdateSchema,
} from '@/schemas/tms/driver';

export const tmsDriverQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.drivers', page, perPage],
    queryFn: () =>
      selectTmsDriver({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsDriverCreateMutationOption = mutationOptions<
  z.infer<typeof tmsDriverSchema>,
  void,
  z.infer<typeof tmsDriverInsertSchema>
>({
  mutationFn: (value) => createTmsDriver({ data: value }),
});

export const tmsDriverUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsDriverSchema>,
    void,
    z.infer<typeof tmsDriverUpdateSchema>
  >({
    mutationFn: (value) => updateTmsDriver({ data: { id, value } }),
  });

export const tmsDriverRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsDriver({ data: { id } }),
});
