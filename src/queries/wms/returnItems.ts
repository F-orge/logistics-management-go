import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsReturnItem,
  removeWmsReturnItem,
  selectWmsReturnItems,
  updateWmsReturnItem,
} from '@/actions/wms/returnItems';
import {
  wmsReturnItemInsertSchema,
  wmsReturnItemSchema,
  wmsReturnItemUpdateSchema,
} from '@/schemas/wms/return_item';

export const wmsReturnItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.returnItems', page, perPage],
    queryFn: () =>
      selectWmsReturnItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsReturnItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsReturnItemSchema>,
  void,
  z.infer<typeof wmsReturnItemInsertSchema>
>({
  mutationFn: (value) => createWmsReturnItem({ data: value }),
});

export const wmsReturnItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsReturnItemSchema>,
    void,
    z.infer<typeof wmsReturnItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsReturnItem({ data: { id, value } }),
  });

export const wmsReturnItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsReturnItem({ data: { id } }),
});
