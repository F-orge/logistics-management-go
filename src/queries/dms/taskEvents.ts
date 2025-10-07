import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createDmsTaskEvent,
  removeDmsTaskEvent,
  selectDmsTaskEvent,
  updateDmsTaskEvent,
} from '@/actions/dms/taskEvents';
import {
  dmsTaskEventInsertSchema,
  dmsTaskEventSchema,
  dmsTaskEventUpdateSchema,
} from '@/schemas/dms/task_event';

export const dmsTaskEventQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.taskEvents', page, perPage],
    queryFn: () =>
      selectDmsTaskEvent({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsTaskEventCreateMutationOption = mutationOptions<
  z.infer<typeof dmsTaskEventSchema>,
  void,
  z.infer<typeof dmsTaskEventInsertSchema>
>({
  mutationFn: (value) => createDmsTaskEvent({ data: value }),
});

export const dmsTaskEventUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsTaskEventSchema>,
    void,
    z.infer<typeof dmsTaskEventUpdateSchema>
  >({
    mutationFn: (value) => updateDmsTaskEvent({ data: { id, value } }),
  });

export const dmsTaskEventRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsTaskEvent({ data: { id } }),
});
