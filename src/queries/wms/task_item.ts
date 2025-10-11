import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inInventoryBatch } from './inventory_batch';
import { inLocation } from './location';
import { inProduct } from './product';
import { inTask } from './task';

export const paginateTaskItem = (
  options: Parameters<typeof orpcClient.wms.paginateTaskItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.taskItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const taskItems = await orpcClient.wms.paginateTaskItem(options);

      const tasks = await client.ensureQueryData(
        inTask(taskItems.map((row) => row.taskId).filter(nonEmpty)),
      );
      const products = await client.ensureQueryData(
        inProduct(taskItems.map((row) => row.productId).filter(nonEmpty)),
      );
      const inventoryBatches = await client.ensureQueryData(
        inInventoryBatch(taskItems.map((row) => row.batchId).filter(nonEmpty)),
      );
      const locations = await client.ensureQueryData(
        inLocation(
          taskItems
            .map((row) => [row.destinationLocationId, row.sourceLocationId])
            .flat()
            .filter(nonEmpty),
        ),
      );

      return taskItems.map((row) => ({
        ...row,
        task: tasks.find((subRow) => subRow.id === row.taskId),
        product: products.find((subRow) => subRow.id === row.productId),
        batch: inventoryBatches.find((subRow) => subRow.id === row.batchId),
        destinationLocation: locations.find(
          (subRow) => subRow.id === row.destinationLocationId,
        ),
        sourceLocation: locations.find(
          (subRow) => subRow.id === row.sourceLocationId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangeTaskItem = (
  options: Parameters<typeof orpcClient.wms.rangeTaskItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.taskItem', 'range', options],
    queryFn: () => orpcClient.wms.rangeTaskItem(options),
    enabled: !!options,
  });

export const inTaskItem = (
  options: Parameters<typeof orpcClient.wms.inTaskItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.taskItem', 'in', options],
    queryFn: () => orpcClient.wms.inTaskItem(options),
    enabled: !!options,
  });

export const createTaskItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createTaskItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createTaskItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createTaskItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.taskItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateTaskItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateTaskItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateTaskItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateTaskItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.taskItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteTaskItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteTaskItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteTaskItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteTaskItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Task Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.taskItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
