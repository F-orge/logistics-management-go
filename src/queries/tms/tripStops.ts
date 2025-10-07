import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsTripStop,
  removeTmsTripStop,
  selectTmsTripStop,
  updateTmsTripStop,
} from '@/actions/tms/tripStops';
import {
  tmsTripStopInsertSchema,
  tmsTripStopSchema,
  tmsTripStopUpdateSchema,
} from '@/schemas/tms/trip_stop';

export const tmsTripStopQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.tripStops', page, perPage],
    queryFn: () =>
      selectTmsTripStop({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsTripStopCreateMutationOption = mutationOptions<
  z.infer<typeof tmsTripStopSchema>,
  void,
  z.infer<typeof tmsTripStopInsertSchema>
>({
  mutationFn: (value) => createTmsTripStop({ data: value }),
});

export const tmsTripStopUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsTripStopSchema>,
    void,
    z.infer<typeof tmsTripStopUpdateSchema>
  >({
    mutationFn: (value) => updateTmsTripStop({ data: { id, value } }),
  });

export const tmsTripStopRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsTripStop({ data: { id } }),
});