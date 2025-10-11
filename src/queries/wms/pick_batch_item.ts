import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inPickBatch } from './pick_batch';
import { inSalesOrder } from './sales_order';

export const paginatePickBatchItem = (
  options: Parameters<typeof orpcClient.wms.paginatePickBatchItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatchItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const pickBatchItems =
        await orpcClient.wms.paginatePickBatchItem(options);

      const pickBatches = await client.ensureQueryData(
        inPickBatch(
          pickBatchItems.map((row) => row.pickBatchId).filter(nonEmpty),
        ),
      );
      const salesOrders = await client.ensureQueryData(
        inSalesOrder(
          pickBatchItems.map((row) => row.salesOrderId).filter(nonEmpty),
        ),
      );

      return pickBatchItems.map((row) => ({
        ...row,
        pickBatch: pickBatches.find((subRow) => subRow.id === row.pickBatchId),
        salesOrder: salesOrders.find(
          (subRow) => subRow.id === row.salesOrderId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangePickBatchItem = (
  options: Parameters<typeof orpcClient.wms.rangePickBatchItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatchItem', 'range', options],
    queryFn: () => orpcClient.wms.rangePickBatchItem(options),
    enabled: !!options,
  });

export const inPickBatchItem = (
  options: Parameters<typeof orpcClient.wms.inPickBatchItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatchItem', 'in', options],
    queryFn: () => orpcClient.wms.inPickBatchItem(options),
    enabled: !!options,
  });

export const createPickBatchItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createPickBatchItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createPickBatchItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createPickBatchItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatchItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePickBatchItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updatePickBatchItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updatePickBatchItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updatePickBatchItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatchItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePickBatchItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deletePickBatchItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deletePickBatchItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deletePickBatchItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatchItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
