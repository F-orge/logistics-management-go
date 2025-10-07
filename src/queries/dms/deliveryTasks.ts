import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createDmsDeliveryTask,
  removeDmsDeliveryTask,
  selectDmsDeliveryTask,
  updateDmsDeliveryTask,
} from '@/actions/dms/deliveryTasks';
import {
  dmsDeliveryTaskInsertSchema,
  dmsDeliveryTaskSchema,
  dmsDeliveryTaskUpdateSchema,
} from '@/schemas/dms/delivery_task';

export const dmsDeliveryTaskQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.deliveryTasks', page, perPage],
    queryFn: () =>
      selectDmsDeliveryTask({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsDeliveryTaskCreateMutationOption = mutationOptions<
  z.infer<typeof dmsDeliveryTaskSchema>,
  void,
  z.infer<typeof dmsDeliveryTaskInsertSchema>
>({
  mutationFn: (value) => createDmsDeliveryTask({ data: value }),
});

export const dmsDeliveryTaskUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsDeliveryTaskSchema>,
    void,
    z.infer<typeof dmsDeliveryTaskUpdateSchema>
  >({
    mutationFn: (value) => updateDmsDeliveryTask({ data: { id, value } }),
  });

export const dmsDeliveryTaskRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsDeliveryTask({ data: { id } }),
});
