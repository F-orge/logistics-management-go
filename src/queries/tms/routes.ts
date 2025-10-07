import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsRoute,
  removeTmsRoute,
  selectTmsRoute,
  updateTmsRoute,
} from '@/actions/tms/routes';
import {
  tmsRouteInsertSchema,
  tmsRouteSchema,
  tmsRouteUpdateSchema,
} from '@/schemas/tms/route';

export const tmsRouteQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.routes', page, perPage],
    queryFn: () =>
      selectTmsRoute({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsRouteCreateMutationOption = mutationOptions<
  z.infer<typeof tmsRouteSchema>,
  void,
  z.infer<typeof tmsRouteInsertSchema>
>({
  mutationFn: (value) => createTmsRoute({ data: value }),
});

export const tmsRouteUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsRouteSchema>,
    void,
    z.infer<typeof tmsRouteUpdateSchema>
  >({
    mutationFn: (value) => updateTmsRoute({ data: { id, value } }),
  });

export const tmsRouteRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsRoute({ data: { id } }),
});