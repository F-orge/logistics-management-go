import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createCrmNotification,
  removeCrmNotification,
  selectCrmNotification,
  updateCrmNotification,
} from '@/actions/crm/notifications';
import {
  insertNotificationSchema,
  updateNotificationSchema,
} from '@/db/schemas';
import { crmNotificationSchema } from '@/schemas/crm/notifications';

export const crmNotificationQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.notifications', page, perPage],
    queryFn: () =>
      selectCrmNotification({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmNotificationCreateMutationOption = mutationOptions<
  z.infer<typeof crmNotificationSchema>,
  void,
  z.infer<typeof insertNotificationSchema>
>({
  mutationFn: (value) => createCrmNotification({ data: value }),
});

export const crmNotificationUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmNotificationSchema>,
    void,
    z.infer<typeof updateNotificationSchema>
  >({
    mutationFn: (value) => updateCrmNotification({ data: { id, value } }),
  });

export const crmNotificationRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmNotification({ data: { id } }),
});
