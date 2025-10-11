import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inInventoryBatch } from './inventory_batch';
import { inPackage } from './package';
import { inProduct } from './product';

export const paginatePackageItem = (
  options: Parameters<typeof orpcClient.wms.paginatePackageItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.packageItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const packageItems = await orpcClient.wms.paginatePackageItem(options);

      const packages = await client.ensureQueryData(
        inPackage(packageItems.map((row) => row.packageId).filter(nonEmpty)),
      );
      const products = await client.ensureQueryData(
        inProduct(packageItems.map((row) => row.productId).filter(nonEmpty)),
      );
      const inventoryBatches = await client.ensureQueryData(
        inInventoryBatch(
          packageItems.map((row) => row.batchId).filter(nonEmpty),
        ),
      );

      return packageItems.map((row) => ({
        ...row,
        package: packages.find((subRow) => subRow.id === row.packageId),
        product: products.find((subRow) => subRow.id === row.productId),
        batch: inventoryBatches.find((subRow) => subRow.id === row.batchId),
      }));
    },
    enabled: !!options,
  });

export const rangePackageItem = (
  options: Parameters<typeof orpcClient.wms.rangePackageItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.packageItem', 'range', options],
    queryFn: () => orpcClient.wms.rangePackageItem(options),
    enabled: !!options,
  });

export const inPackageItem = (
  options: Parameters<typeof orpcClient.wms.inPackageItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.packageItem', 'in', options],
    queryFn: () => orpcClient.wms.inPackageItem(options),
    enabled: !!options,
  });

export const createPackageItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createPackageItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createPackageItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createPackageItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.packageItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePackageItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updatePackageItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updatePackageItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updatePackageItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.packageItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePackageItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deletePackageItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deletePackageItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deletePackageItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.packageItem'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
