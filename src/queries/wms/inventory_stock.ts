import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inProduct } from './product';
import { inLocation } from './location';
import { inInventoryBatch } from './inventory_batch';

export const paginateInventoryStock = (
  options: Parameters<typeof orpcClient.wms.paginateInventoryStock>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryStock', 'paginate', options],
    queryFn: async ({ client }) => {
      const inventoryStocks = await orpcClient.wms.paginateInventoryStock(options);

      const products = await client.ensureQueryData(
        inProduct(inventoryStocks.map((row) => row.productId).filter(nonEmpty)),
      );
      const locations = await client.ensureQueryData(
        inLocation(inventoryStocks.map((row) => row.locationId).filter(nonEmpty)),
      );
      const inventoryBatches = await client.ensureQueryData(
        inInventoryBatch(inventoryStocks.map((row) => row.batchId).filter(nonEmpty)),
      );

      return inventoryStocks.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
        location: locations.find((subRow) => subRow.id === row.locationId),
        batch: inventoryBatches.find((subRow) => subRow.id === row.batchId),
      }));
    },
    enabled: !!options,
  });

export const rangeInventoryStock = (
  options: Parameters<typeof orpcClient.wms.rangeInventoryStock>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryStock', 'range', options],
    queryFn: () => orpcClient.wms.rangeInventoryStock(options),
    enabled: !!options,
  });

export const inInventoryStock = (
  options: Parameters<typeof orpcClient.wms.inInventoryStock>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryStock', 'in', options],
    queryFn: () => orpcClient.wms.inInventoryStock(options),
    enabled: !!options,
  });

export const createInventoryStock = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createInventoryStock>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createInventoryStock>[0]
>({
  mutationFn: (options) => orpcClient.wms.createInventoryStock(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Stock: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.inventoryStock'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInventoryStock = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateInventoryStock>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateInventoryStock>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateInventoryStock(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Stock: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.inventoryStock'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInventoryStock = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteInventoryStock>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteInventoryStock>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteInventoryStock(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Stock has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.inventoryStock'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
