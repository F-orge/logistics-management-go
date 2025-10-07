import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsTaskItem,
  removeWmsTaskItem,
  selectWmsTaskItems,
  updateWmsTaskItem,
} from '@/actions/wms/taskItems';
import {
  wmsTaskItemInsertSchema,
  wmsTaskItemSchema,
  wmsTaskItemUpdateSchema,
} from '@/schemas/wms/task_item';

export const wmsTaskItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.taskItems', page, perPage],
    queryFn: () =>
      selectWmsTaskItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsTaskItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsTaskItemSchema>,
  void,
  z.infer<typeof wmsTaskItemInsertSchema>
>({
  mutationFn: (value) => createWmsTaskItem({ data: value }),
});

export const wmsTaskItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsTaskItemSchema>,
    void,
    z.infer<typeof wmsTaskItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsTaskItem({ data: { id, value } }),
  });

export const wmsTaskItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsTaskItem({ data: { id } }),
});
