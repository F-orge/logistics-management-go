import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inProduct } from './product';
import { inSalesOrder } from './sales_order';

export const paginateSalesOrderItem = (
  options: Parameters<typeof orpcClient.wms.paginateSalesOrderItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.salesOrderItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const salesOrderItems =
        await orpcClient.wms.paginateSalesOrderItem(options);

      const products = await client.ensureQueryData(
        inProduct(salesOrderItems.map((row) => row.productId).filter(nonEmpty)),
      );

      return salesOrderItems.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
      }));
    },
    enabled: !!options,
  });

export const rangeSalesOrderItem = (
  options: Parameters<typeof orpcClient.wms.rangeSalesOrderItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.salesOrderItem', 'range', options],
    queryFn: () => orpcClient.wms.rangeSalesOrderItem(options),
    enabled: !!options,
  });

export const inSalesOrderItem = (
  options: Parameters<typeof orpcClient.wms.inSalesOrderItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.salesOrderItem', 'in', options],
    queryFn: () => orpcClient.wms.inSalesOrderItem(options),
    enabled: !!options,
  });

export const createSalesOrderItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createSalesOrderItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createSalesOrderItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createSalesOrderItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.salesOrderItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateSalesOrderItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateSalesOrderItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateSalesOrderItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateSalesOrderItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.salesOrderItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteSalesOrderItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteSalesOrderItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteSalesOrderItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteSalesOrderItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.salesOrderItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
