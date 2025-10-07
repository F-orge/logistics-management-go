import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsLocation,
  removeWmsLocation,
  selectWmsLocations,
  updateWmsLocation,
} from '@/actions/wms/locations';
import {
  wmsLocationInsertSchema,
  wmsLocationSchema,
  wmsLocationUpdateSchema,
} from '@/schemas/wms/location';

export const wmsLocationQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.locations', page, perPage],
    queryFn: () =>
      selectWmsLocations({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsLocationCreateMutationOption = mutationOptions<
  z.infer<typeof wmsLocationSchema>,
  void,
  z.infer<typeof wmsLocationInsertSchema>
>({
  mutationFn: (value) => createWmsLocation({ data: value }),
});

export const wmsLocationUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsLocationSchema>,
    void,
    z.infer<typeof wmsLocationUpdateSchema>
  >({
    mutationFn: (value) => updateWmsLocation({ data: { id, value } }),
  });

export const wmsLocationRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsLocation({ data: { id } }),
});