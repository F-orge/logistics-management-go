import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '@/queries/auth/user';
import { inPickBatch } from './pick_batch';
import { inWarehouse } from './warehouse';
import { paginateTaskItem } from './task_item';

export const paginateTask = (
  options: Parameters<typeof orpcClient.wms.paginateTask>[0],
) =>
  queryOptions({
    queryKey: ['wms.task', 'paginate', options],
    queryFn: async ({ client }) => {
      const tasks = await orpcClient.wms.paginateTask(options);

      const warehouses = await client.ensureQueryData(
        inWarehouse(tasks.map((row) => row.warehouseId).filter(nonEmpty)),
      );

      const users = await client.ensureQueryData(
        inUser(tasks.map((row) => row.userId).filter(nonEmpty)),
      );

      const pickBatches = await client.ensureQueryData(
        inPickBatch(tasks.map((row) => row.pickBatchId).filter(nonEmpty)),
      );

      const items = await client.ensureQueryData(
        paginateTaskItem({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'taskId',
              operation: 'in',
              value: tasks.map((row) => row.id),
            },
          ],
        }),
      );

      return tasks.map((row) => ({
        ...row,
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        user: users.find((subRow) => subRow.id === row.userId),
        pickBatch: pickBatches.find((subRow) => subRow.id === row.pickBatchId),
        items: items.filter((subRow) => subRow.taskId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeTask = (
  options: Parameters<typeof orpcClient.wms.rangeTask>[0],
) =>
  queryOptions({
    queryKey: ['wms.task', 'range', options],
    queryFn: () => orpcClient.wms.rangeTask(options),
    enabled: !!options,
  });

export const inTask = (options: Parameters<typeof orpcClient.wms.inTask>[0]) =>
  queryOptions({
    queryKey: ['wms.task', 'in', options],
    queryFn: () => orpcClient.wms.inTask(options),
    enabled: !!options,
  });

export const createTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createTask>[0]
>({
  mutationFn: (options) => orpcClient.wms.createTask(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.task'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateTask>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateTask(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.task'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteTask>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteTask(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.task'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
