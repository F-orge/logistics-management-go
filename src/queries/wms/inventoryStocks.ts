import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsInventoryStock,
  removeWmsInventoryStock,
  selectWmsInventoryStocks,
  updateWmsInventoryStock,
} from '@/actions/wms/inventoryStocks';
import {
  wmsInventoryStockInsertSchema,
  wmsInventoryStockSchema,
  wmsInventoryStockUpdateSchema,
} from '@/schemas/wms/inventory_stock';

export const wmsInventoryStockQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.inventoryStocks', page, perPage],
    queryFn: () =>
      selectWmsInventoryStocks({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsInventoryStockCreateMutationOption = mutationOptions<
  z.infer<typeof wmsInventoryStockSchema>,
  void,
  z.infer<typeof wmsInventoryStockInsertSchema>
>({
  mutationFn: (value) => createWmsInventoryStock({ data: value }),
});

export const wmsInventoryStockUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsInventoryStockSchema>,
    void,
    z.infer<typeof wmsInventoryStockUpdateSchema>
  >({
    mutationFn: (value) => updateWmsInventoryStock({ data: { id, value } }),
  });

export const wmsInventoryStockRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsInventoryStock({ data: { id } }),
});