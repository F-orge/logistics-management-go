import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsInventoryAdjustment,
  removeWmsInventoryAdjustment,
  selectWmsInventoryAdjustments,
  updateWmsInventoryAdjustment,
} from '@/actions/wms/inventoryAdjustments';
import {
  wmsInventoryAdjustmentInsertSchema,
  wmsInventoryAdjustmentSchema,
  wmsInventoryAdjustmentUpdateSchema,
} from '@/schemas/wms/inventory_adjustment';

export const wmsInventoryAdjustmentQueryOption = (
  page: number,
  perPage: number,
) =>
  queryOptions({
    queryKey: ['wms.inventoryAdjustments', page, perPage],
    queryFn: () =>
      selectWmsInventoryAdjustments({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsInventoryAdjustmentCreateMutationOption = mutationOptions<
  z.infer<typeof wmsInventoryAdjustmentSchema>,
  void,
  z.infer<typeof wmsInventoryAdjustmentInsertSchema>
>({
  mutationFn: (value) => createWmsInventoryAdjustment({ data: value }),
});

export const wmsInventoryAdjustmentUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsInventoryAdjustmentSchema>,
    void,
    z.infer<typeof wmsInventoryAdjustmentUpdateSchema>
  >({
    mutationFn: (value) =>
      updateWmsInventoryAdjustment({ data: { id, value } }),
  });

export const wmsInventoryAdjustmentRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsInventoryAdjustment({ data: { id } }),
});
