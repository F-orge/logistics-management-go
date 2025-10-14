import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { paginateReturnItem } from './return_item';
import { inSalesOrder } from './sales_order';

export const paginateReturn = (
  options: Parameters<typeof orpcClient.wms.paginateReturn>[0],
) =>
  queryOptions({
    queryKey: ['wms.return', 'paginate', options],
    queryFn: async ({ client }) => {
      const returns = await orpcClient.wms.paginateReturn(options);

      const salesOrders = await client.ensureQueryData(
        inSalesOrder(returns.map((row) => row.salesOrderId).filter(nonEmpty)),
      );

      const items = await client.ensureQueryData(
        paginateReturnItem({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'productId',
              operation: 'in',
              value: returns.map((row) => row.id),
            },
          ],
        }),
      );

      return returns.map((row) => ({
        ...row,
        salesOrder: salesOrders.find(
          (subRow) => subRow.id === row.salesOrderId,
        ),
        items: items.filter((subRow) => subRow.returnId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeReturn = (
  options: Parameters<typeof orpcClient.wms.rangeReturn>[0],
) =>
  queryOptions({
    queryKey: ['wms.return', 'range', options],
    queryFn: () => orpcClient.wms.rangeReturn(options),
    enabled: !!options,
  });

export const inReturn = (
  options: Parameters<typeof orpcClient.wms.inReturn>[0],
) =>
  queryOptions({
    queryKey: ['wms.return', 'in', options],
    queryFn: () => orpcClient.wms.inReturn(options),
    enabled: !!options,
  });

export const createReturn = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createReturn>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createReturn>[0]
>({
  mutationFn: (options) => orpcClient.wms.createReturn(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.return'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateReturn = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateReturn>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateReturn>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateReturn(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.return'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteReturn = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteReturn>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteReturn>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteReturn(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.return'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
