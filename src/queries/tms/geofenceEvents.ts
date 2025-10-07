import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsGeofenceEvent,
  removeTmsGeofenceEvent,
  selectTmsGeofenceEvent,
  updateTmsGeofenceEvent,
} from '@/actions/tms/geofenceEvents';
import {
  tmsGeofenceEventInsertSchema,
  tmsGeofenceEventSchema,
  tmsGeofenceEventUpdateSchema,
} from '@/schemas/tms/geofence_event';

export const tmsGeofenceEventQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.geofenceEvents', page, perPage],
    queryFn: () =>
      selectTmsGeofenceEvent({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsGeofenceEventCreateMutationOption = mutationOptions<
  z.infer<typeof tmsGeofenceEventSchema>,
  void,
  z.infer<typeof tmsGeofenceEventInsertSchema>
>({
  mutationFn: (value) => createTmsGeofenceEvent({ data: value }),
});

export const tmsGeofenceEventUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsGeofenceEventSchema>,
    void,
    z.infer<typeof tmsGeofenceEventUpdateSchema>
  >({
    mutationFn: (value) => updateTmsGeofenceEvent({ data: { id, value } }),
  });

export const tmsGeofenceEventRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsGeofenceEvent({ data: { id } }),
});
