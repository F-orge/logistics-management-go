import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsReorderPoint,
  removeWmsReorderPoint,
  selectWmsReorderPoints,
  updateWmsReorderPoint,
} from '@/actions/wms/reorderPoints';
import {
  wmsReorderPointInsertSchema,
  wmsReorderPointSchema,
  wmsReorderPointUpdateSchema,
} from '@/schemas/wms/reorder_point';

export const wmsReorderPointQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.reorderPoints', page, perPage],
    queryFn: () =>
      selectWmsReorderPoints({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsReorderPointCreateMutationOption = mutationOptions<
  z.infer<typeof wmsReorderPointSchema>,
  void,
  z.infer<typeof wmsReorderPointInsertSchema>
>({
  mutationFn: (value) => createWmsReorderPoint({ data: value }),
});

export const wmsReorderPointUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsReorderPointSchema>,
    void,
    z.infer<typeof wmsReorderPointUpdateSchema>
  >({
    mutationFn: (value) => updateWmsReorderPoint({ data: { id, value } }),
  });

export const wmsReorderPointRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsReorderPoint({ data: { id } }),
});