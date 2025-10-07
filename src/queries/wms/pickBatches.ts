import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsPickBatch,
  removeWmsPickBatch,
  selectWmsPickBatches,
  updateWmsPickBatch,
} from '@/actions/wms/pickBatches';
import {
  wmsPickBatchInsertSchema,
  wmsPickBatchSchema,
  wmsPickBatchUpdateSchema,
} from '@/schemas/wms/pick_batch';

export const wmsPickBatchQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.pickBatches', page, perPage],
    queryFn: () =>
      selectWmsPickBatches({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsPickBatchCreateMutationOption = mutationOptions<
  z.infer<typeof wmsPickBatchSchema>,
  void,
  z.infer<typeof wmsPickBatchInsertSchema>
>({
  mutationFn: (value) => createWmsPickBatch({ data: value }),
});

export const wmsPickBatchUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsPickBatchSchema>,
    void,
    z.infer<typeof wmsPickBatchUpdateSchema>
  >({
    mutationFn: (value) => updateWmsPickBatch({ data: { id, value } }),
  });

export const wmsPickBatchRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsPickBatch({ data: { id } }),
});
