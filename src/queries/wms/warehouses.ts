import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsWarehouse,
  removeWmsWarehouse,
  selectWmsWarehouses,
  updateWmsWarehouse,
} from '@/actions/wms/warehouses';
import {
  wmsWarehouseInsertSchema,
  wmsWarehouseSchema,
  wmsWarehouseUpdateSchema,
} from '@/schemas/wms/warehouse';

export const wmsWarehouseQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.warehouses', page, perPage],
    queryFn: () =>
      selectWmsWarehouses({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsWarehouseCreateMutationOption = mutationOptions<
  z.infer<typeof wmsWarehouseSchema>,
  void,
  z.infer<typeof wmsWarehouseInsertSchema>
>({
  mutationFn: (value) => createWmsWarehouse({ data: value }),
});

export const wmsWarehouseUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsWarehouseSchema>,
    void,
    z.infer<typeof wmsWarehouseUpdateSchema>
  >({
    mutationFn: (value) => updateWmsWarehouse({ data: { id, value } }),
  });

export const wmsWarehouseRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsWarehouse({ data: { id } }),
});