import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsTask,
  removeWmsTask,
  selectWmsTasks,
  updateWmsTask,
} from '@/actions/wms/tasks';
import {
  wmsTaskInsertSchema,
  wmsTaskSchema,
  wmsTaskUpdateSchema,
} from '@/schemas/wms/task';

export const wmsTaskQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.tasks', page, perPage],
    queryFn: () =>
      selectWmsTasks({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsTaskCreateMutationOption = mutationOptions<
  z.infer<typeof wmsTaskSchema>,
  void,
  z.infer<typeof wmsTaskInsertSchema>
>({
  mutationFn: (value) => createWmsTask({ data: value }),
});

export const wmsTaskUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsTaskSchema>,
    void,
    z.infer<typeof wmsTaskUpdateSchema>
  >({
    mutationFn: (value) => updateWmsTask({ data: { id, value } }),
  });

export const wmsTaskRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsTask({ data: { id } }),
});