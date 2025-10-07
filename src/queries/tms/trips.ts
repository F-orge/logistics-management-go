import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsTrip,
  removeTmsTrip,
  selectTmsTrip,
  updateTmsTrip,
} from '@/actions/tms/trips';
import {
  tmsTripInsertSchema,
  tmsTripSchema,
  tmsTripUpdateSchema,
} from '@/schemas/tms/trip';

export const tmsTripQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.trips', page, perPage],
    queryFn: () =>
      selectTmsTrip({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsTripCreateMutationOption = mutationOptions<
  z.infer<typeof tmsTripSchema>,
  void,
  z.infer<typeof tmsTripInsertSchema>
>({
  mutationFn: (value) => createTmsTrip({ data: value }),
});

export const tmsTripUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsTripSchema>,
    void,
    z.infer<typeof tmsTripUpdateSchema>
  >({
    mutationFn: (value) => updateTmsTrip({ data: { id, value } }),
  });

export const tmsTripRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsTrip({ data: { id } }),
});
