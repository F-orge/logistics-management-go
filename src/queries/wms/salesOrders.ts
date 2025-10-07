import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsSalesOrder,
  removeWmsSalesOrder,
  selectWmsSalesOrders,
  updateWmsSalesOrder,
} from '@/actions/wms/salesOrders';
import {
  wmsSalesOrderInsertSchema,
  wmsSalesOrderSchema,
  wmsSalesOrderUpdateSchema,
} from '@/schemas/wms/sales_order';

export const wmsSalesOrderQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.salesOrders', page, perPage],
    queryFn: () =>
      selectWmsSalesOrders({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsSalesOrderCreateMutationOption = mutationOptions<
  z.infer<typeof wmsSalesOrderSchema>,
  void,
  z.infer<typeof wmsSalesOrderInsertSchema>
>({
  mutationFn: (value) => createWmsSalesOrder({ data: value }),
});

export const wmsSalesOrderUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsSalesOrderSchema>,
    void,
    z.infer<typeof wmsSalesOrderUpdateSchema>
  >({
    mutationFn: (value) => updateWmsSalesOrder({ data: { id, value } }),
  });

export const wmsSalesOrderRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsSalesOrder({ data: { id } }),
});
