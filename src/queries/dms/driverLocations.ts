import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createDmsDriverLocation,
  removeDmsDriverLocation,
  selectDmsDriverLocation,
  updateDmsDriverLocation,
} from '@/actions/dms/driverLocations';
import {
  dmsDriverLocationInsertSchema,
  dmsDriverLocationSchema,
  dmsDriverLocationUpdateSchema,
} from '@/schemas/dms/driver_location';

export const dmsDriverLocationQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.driverLocations', page, perPage],
    queryFn: () =>
      selectDmsDriverLocation({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsDriverLocationCreateMutationOption = mutationOptions<
  z.infer<typeof dmsDriverLocationSchema>,
  void,
  z.infer<typeof dmsDriverLocationInsertSchema>
>({
  mutationFn: (value) => createDmsDriverLocation({ data: value }),
});

export const dmsDriverLocationUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsDriverLocationSchema>,
    void,
    z.infer<typeof dmsDriverLocationUpdateSchema>
  >({
    mutationFn: (value) => updateDmsDriverLocation({ data: { id, value } }),
  });

export const dmsDriverLocationRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsDriverLocation({ data: { id } }),
});
