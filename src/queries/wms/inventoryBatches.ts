import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsInventoryBatch,
  removeWmsInventoryBatch,
  selectWmsInventoryBatches,
  updateWmsInventoryBatch,
} from '@/actions/wms/inventoryBatches';
import {
  wmsInventoryBatchInsertSchema,
  wmsInventoryBatchSchema,
  wmsInventoryBatchUpdateSchema,
} from '@/schemas/wms/inventory_batch';

export const wmsInventoryBatchQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.inventoryBatches', page, perPage],
    queryFn: () =>
      selectWmsInventoryBatches({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsInventoryBatchCreateMutationOption = mutationOptions<
  z.infer<typeof wmsInventoryBatchSchema>,
  void,
  z.infer<typeof wmsInventoryBatchInsertSchema>
>({
  mutationFn: (value) => createWmsInventoryBatch({ data: value }),
});

export const wmsInventoryBatchUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsInventoryBatchSchema>,
    void,
    z.infer<typeof wmsInventoryBatchUpdateSchema>
  >({
    mutationFn: (value) => updateWmsInventoryBatch({ data: { id, value } }),
  });

export const wmsInventoryBatchRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsInventoryBatch({ data: { id } }),
});
