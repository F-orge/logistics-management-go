import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsGeofence,
  removeTmsGeofence,
  selectTmsGeofence,
  updateTmsGeofence,
} from '@/actions/tms/geofences';
import {
  tmsGeofenceInsertSchema,
  tmsGeofenceSchema,
  tmsGeofenceUpdateSchema,
} from '@/schemas/tms/geofence';

export const tmsGeofenceQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.geofences', page, perPage],
    queryFn: () =>
      selectTmsGeofence({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsGeofenceCreateMutationOption = mutationOptions<
  z.infer<typeof tmsGeofenceSchema>,
  void,
  z.infer<typeof tmsGeofenceInsertSchema>
>({
  mutationFn: (value) => createTmsGeofence({ data: value }),
});

export const tmsGeofenceUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsGeofenceSchema>,
    void,
    z.infer<typeof tmsGeofenceUpdateSchema>
  >({
    mutationFn: (value) => updateTmsGeofence({ data: { id, value } }),
  });

export const tmsGeofenceRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsGeofence({ data: { id } }),
});
