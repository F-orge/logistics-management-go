import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inLocation } from './location';
import { inProduct } from './product';

export const paginateBinThreshold = (
  options: Parameters<typeof orpcClient.wms.paginateBinThreshold>[0],
) =>
  queryOptions({
    queryKey: ['wms.binThreshold', 'paginate', options],
    queryFn: async ({ client }) => {
      const binThresholds = await orpcClient.wms.paginateBinThreshold(options);

      const locations = await client.ensureQueryData(
        inLocation(binThresholds.map((row) => row.locationId).filter(nonEmpty)),
      );
      const products = await client.ensureQueryData(
        inProduct(binThresholds.map((row) => row.productId).filter(nonEmpty)),
      );

      return binThresholds.map((row) => ({
        ...row,
        location: locations.find((subRow) => subRow.id === row.locationId),
        product: products.find((subRow) => subRow.id === row.productId),
      }));
    },
    enabled: !!options,
  });

export const rangeBinThreshold = (
  options: Parameters<typeof orpcClient.wms.rangeBinThreshold>[0],
) =>
  queryOptions({
    queryKey: ['wms.binThreshold', 'range', options],
    queryFn: () => orpcClient.wms.rangeBinThreshold(options),
    enabled: !!options,
  });

export const inBinThreshold = (
  options: Parameters<typeof orpcClient.wms.inBinThreshold>[0],
) =>
  queryOptions({
    queryKey: ['wms.binThreshold', 'in', options],
    queryFn: () => orpcClient.wms.inBinThreshold(options),
    enabled: !!options,
  });

export const createBinThreshold = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createBinThreshold>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createBinThreshold>[0]
>({
  mutationFn: (options) => orpcClient.wms.createBinThreshold(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Bin Threshold: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.binThreshold'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateBinThreshold = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateBinThreshold>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateBinThreshold>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateBinThreshold(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Bin Threshold: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.binThreshold'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteBinThreshold = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteBinThreshold>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteBinThreshold>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteBinThreshold(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Bin Threshold has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.binThreshold'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
