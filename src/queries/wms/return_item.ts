import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inReturn } from './return';
import { inProduct } from './product';

export const paginateReturnItem = (
  options: Parameters<typeof orpcClient.wms.paginateReturnItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.returnItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const returnItems = await orpcClient.wms.paginateReturnItem(options);

      const returns = await client.ensureQueryData(
        inReturn(returnItems.map((row) => row.returnId).filter(nonEmpty)),
      );
      const products = await client.ensureQueryData(
        inProduct(returnItems.map((row) => row.productId).filter(nonEmpty)),
      );

      return returnItems.map((row) => ({
        ...row,
        return: returns.find((subRow) => subRow.id === row.returnId),
        product: products.find((subRow) => subRow.id === row.productId),
      }));
    },
    enabled: !!options,
  });

export const rangeReturnItem = (
  options: Parameters<typeof orpcClient.wms.rangeReturnItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.returnItem', 'range', options],
    queryFn: () => orpcClient.wms.rangeReturnItem(options),
    enabled: !!options,
  });

export const inReturnItem = (
  options: Parameters<typeof orpcClient.wms.inReturnItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.returnItem', 'in', options],
    queryFn: () => orpcClient.wms.inReturnItem(options),
    enabled: !!options,
  });

export const createReturnItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createReturnItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createReturnItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createReturnItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.returnItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateReturnItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateReturnItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateReturnItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateReturnItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.returnItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteReturnItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteReturnItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteReturnItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteReturnItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Return Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.returnItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
