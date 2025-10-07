import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createDmsDeliveryRoute,
  removeDmsDeliveryRoute,
  selectDmsDeliveryRoute,
  updateDmsDeliveryRoute,
} from '@/actions/dms/deliveryRoutes';
import {
  dmsDeliveryRouteInsertSchema,
  dmsDeliveryRouteSchema,
  dmsDeliveryRouteUpdateSchema,
} from '@/schemas/dms/delivery_route';

export const dmsDeliveryRouteQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.deliveryRoutes', page, perPage],
    queryFn: () =>
      selectDmsDeliveryRoute({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsDeliveryRouteCreateMutationOption = mutationOptions<
  z.infer<typeof dmsDeliveryRouteSchema>,
  void,
  z.infer<typeof dmsDeliveryRouteInsertSchema>
>({
  mutationFn: (value) => createDmsDeliveryRoute({ data: value }),
});

export const dmsDeliveryRouteUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsDeliveryRouteSchema>,
    void,
    z.infer<typeof dmsDeliveryRouteUpdateSchema>
  >({
    mutationFn: (value) => updateDmsDeliveryRoute({ data: { id, value } }),
  });

export const dmsDeliveryRouteRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsDeliveryRoute({ data: { id } }),
});