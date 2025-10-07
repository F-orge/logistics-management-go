import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsGpsPing,
  removeTmsGpsPing,
  selectTmsGpsPing,
  updateTmsGpsPing,
} from '@/actions/tms/gpsPings';
import {
  tmsGpsPingInsertSchema,
  tmsGpsPingSchema,
  tmsGpsPingUpdateSchema,
} from '@/schemas/tms/gps_ping';

export const tmsGpsPingQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.gpsPings', page, perPage],
    queryFn: () =>
      selectTmsGpsPing({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsGpsPingCreateMutationOption = mutationOptions<
  z.infer<typeof tmsGpsPingSchema>,
  void,
  z.infer<typeof tmsGpsPingInsertSchema>
>({
  mutationFn: (value) => createTmsGpsPing({ data: value }),
});

export const tmsGpsPingUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsGpsPingSchema>,
    void,
    z.infer<typeof tmsGpsPingUpdateSchema>
  >({
    mutationFn: (value) => updateTmsGpsPing({ data: { id, value } }),
  });

export const tmsGpsPingRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsGpsPing({ data: { id } }),
});
