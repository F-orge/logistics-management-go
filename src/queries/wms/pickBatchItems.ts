import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsPickBatchItem,
  removeWmsPickBatchItem,
  selectWmsPickBatchItems,
  updateWmsPickBatchItem,
} from '@/actions/wms/pickBatchItems';
import {
  wmsPickBatchItemInsertSchema,
  wmsPickBatchItemSchema,
  wmsPickBatchItemUpdateSchema,
} from '@/schemas/wms/pick_batch_item';

export const wmsPickBatchItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.pickBatchItems', page, perPage],
    queryFn: () =>
      selectWmsPickBatchItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsPickBatchItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsPickBatchItemSchema>,
  void,
  z.infer<typeof wmsPickBatchItemInsertSchema>
>({
  mutationFn: (value) => createWmsPickBatchItem({ data: value }),
});

export const wmsPickBatchItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsPickBatchItemSchema>,
    void,
    z.infer<typeof wmsPickBatchItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsPickBatchItem({ data: { id, value } }),
  });

export const wmsPickBatchItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsPickBatchItem({ data: { id } }),
});
