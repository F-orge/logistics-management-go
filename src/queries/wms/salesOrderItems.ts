import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsSalesOrderItem,
  removeWmsSalesOrderItem,
  selectWmsSalesOrderItems,
  updateWmsSalesOrderItem,
} from '@/actions/wms/salesOrderItems';
import {
  wmsSalesOrderItemInsertSchema,
  wmsSalesOrderItemSchema,
  wmsSalesOrderItemUpdateSchema,
} from '@/schemas/wms/sales_order_item';

export const wmsSalesOrderItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.salesOrderItems', page, perPage],
    queryFn: () =>
      selectWmsSalesOrderItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsSalesOrderItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsSalesOrderItemSchema>,
  void,
  z.infer<typeof wmsSalesOrderItemInsertSchema>
>({
  mutationFn: (value) => createWmsSalesOrderItem({ data: value }),
});

export const wmsSalesOrderItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsSalesOrderItemSchema>,
    void,
    z.infer<typeof wmsSalesOrderItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsSalesOrderItem({ data: { id, value } }),
  });

export const wmsSalesOrderItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsSalesOrderItem({ data: { id } }),
});
