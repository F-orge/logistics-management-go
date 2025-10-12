import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inDeliveryTask } from './delivery_task';

export const paginateTaskEvent = (
  options: Parameters<typeof orpcClient.dms.paginateTaskEvent>[0],
) =>
  queryOptions({
    queryKey: ['dms.taskEvent', 'paginate', options],
    queryFn: async ({ client }) => {
      const taskEvents = await orpcClient.dms.paginateTaskEvent(options);

      return taskEvents.map((row) => ({
        ...row,
      }));
    },
    enabled: !!options,
  });

export const rangeTaskEvent = (
  options: Parameters<typeof orpcClient.dms.rangeTaskEvent>[0],
) =>
  queryOptions({
    queryKey: ['dms.taskEvent', 'range', options],
    queryFn: () => orpcClient.dms.rangeTaskEvent(options),
    enabled: !!options,
  });

export const inTaskEvent = (
  options: Parameters<typeof orpcClient.dms.inTaskEvent>[0],
) =>
  queryOptions({
    queryKey: ['dms.taskEvent', 'in', options],
    queryFn: () => orpcClient.dms.inTaskEvent(options),
    enabled: !!options,
  });

export const createTaskEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createTaskEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createTaskEvent>[0]
>({
  mutationFn: (options) => orpcClient.dms.createTaskEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Event: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.taskEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateTaskEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateTaskEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateTaskEvent>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateTaskEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Event: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.taskEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteTaskEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteTaskEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteTaskEvent>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteTaskEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Event has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.taskEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
