import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';
import { inUser } from '../auth/user';

export const paginateNotification = (
  options: Parameters<typeof orpcClient.crm.paginateNotification>[0],
) =>
  queryOptions({
    queryKey: ['crm.notifications', options],
    queryFn: async ({ client }) => {
      const notifications = await orpcClient.crm.paginateNotification(options);

      const users = await client.ensureQueryData(
        inUser(notifications.map((row) => row.userId)),
      );

      return notifications.map((row) => ({
        ...row,
        user: users.find((subRow) => subRow.id === row.userId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeNotification = (
  options: Parameters<typeof orpcClient.crm.rangeNotification>[0],
) =>
  queryOptions({
    queryKey: ['crm.notifications', options],
    queryFn: () => orpcClient.crm.rangeNotification(options),
    enabled: !!options,
  });

export const inNotification = (
  options: Parameters<typeof orpcClient.crm.inNotification>[0],
) =>
  queryOptions({
    queryKey: ['crm.notifications', options],
    queryFn: () => orpcClient.crm.inNotification(options),
    enabled: !!options,
  });

export const createNotification = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createNotification>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createNotification>[0]
>({
  mutationFn: (options) => orpcClient.crm.createNotification(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Notification: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.notifications'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateNotification = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateNotification>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateNotification>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateNotification(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Notification: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.notifications'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteNotification = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteNotification>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteNotification>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteNotification(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.notifications'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
