import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '@/queries/auth/user';
import { inProduct } from './product';
import { inWarehouse } from './warehouse';

export const paginateInventoryAdjustment = (
  options: Parameters<typeof orpcClient.wms.paginateInventoryAdjustment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryAdjustment', 'paginate', options],
    queryFn: async ({ client }) => {
      const inventoryAdjustments =
        await orpcClient.wms.paginateInventoryAdjustment(options);

      const products = await client.ensureQueryData(
        inProduct(
          inventoryAdjustments.map((row) => row.productId).filter(nonEmpty),
        ),
      );
      const warehouses = await client.ensureQueryData(
        inWarehouse(
          inventoryAdjustments.map((row) => row.warehouseId).filter(nonEmpty),
        ),
      );
      const users = await client.ensureQueryData(
        inUser(inventoryAdjustments.map((row) => row.userId).filter(nonEmpty)),
      );

      return inventoryAdjustments.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        user: users.find((subRow) => subRow.id === row.userId),
      }));
    },
    enabled: !!options,
  });

export const rangeInventoryAdjustment = (
  options: Parameters<typeof orpcClient.wms.rangeInventoryAdjustment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryAdjustment', 'range', options],
    queryFn: () => orpcClient.wms.rangeInventoryAdjustment(options),
    enabled: !!options,
  });

export const inInventoryAdjustment = (
  options: Parameters<typeof orpcClient.wms.inInventoryAdjustment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryAdjustment', 'in', options],
    queryFn: () => orpcClient.wms.inInventoryAdjustment(options),
    enabled: !!options,
  });

export const createInventoryAdjustment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createInventoryAdjustment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createInventoryAdjustment>[0]
>({
  mutationFn: (options) => orpcClient.wms.createInventoryAdjustment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Adjustment: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryAdjustment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInventoryAdjustment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateInventoryAdjustment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateInventoryAdjustment>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateInventoryAdjustment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Adjustment: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryAdjustment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInventoryAdjustment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteInventoryAdjustment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteInventoryAdjustment>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteInventoryAdjustment(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Adjustment has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryAdjustment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
