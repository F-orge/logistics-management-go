import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '@/queries/auth/user';
import { inSalesOrder } from './sales_order';
import { inWarehouse } from './warehouse';
import { paginatePackageItem } from './package_item';

export const paginatePackage = (
  options: Parameters<typeof orpcClient.wms.paginatePackage>[0],
) =>
  queryOptions({
    queryKey: ['wms.package', 'paginate', options],
    queryFn: async ({ client }) => {
      const packages = await orpcClient.wms.paginatePackage(options);

      const salesOrders = await client.ensureQueryData(
        inSalesOrder(packages.map((row) => row.salesOrderId).filter(nonEmpty)),
      );
      const warehouses = await client.ensureQueryData(
        inWarehouse(packages.map((row) => row.warehouseId).filter(nonEmpty)),
      );
      const packedByUsers = await client.ensureQueryData(
        inUser(packages.map((row) => row.packedByUserId).filter(nonEmpty)),
      );

      const items = await client.ensureQueryData(
        paginatePackageItem({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'packageId',
              operation: 'in',
              value: packages.map((row) => row.id),
            },
          ],
        }),
      );

      return packages.map((row) => ({
        ...row,
        salesOrder: salesOrders.find(
          (subRow) => subRow.id === row.salesOrderId,
        ),
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        packedByUser: packedByUsers.find(
          (subRow) => subRow.id === row.packedByUserId,
        ),
        items: items.filter((subRow) => subRow.packageId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangePackage = (
  options: Parameters<typeof orpcClient.wms.rangePackage>[0],
) =>
  queryOptions({
    queryKey: ['wms.package', 'range', options],
    queryFn: () => orpcClient.wms.rangePackage(options),
    enabled: !!options,
  });

export const inPackage = (
  options: Parameters<typeof orpcClient.wms.inPackage>[0],
) =>
  queryOptions({
    queryKey: ['wms.package', 'in', options],
    queryFn: () => orpcClient.wms.inPackage(options),
    enabled: !!options,
  });

export const createPackage = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createPackage>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createPackage>[0]
>({
  mutationFn: (options) => orpcClient.wms.createPackage(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.package'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePackage = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updatePackage>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updatePackage>[0]
>({
  mutationFn: (options) => orpcClient.wms.updatePackage(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.package'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePackage = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deletePackage>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deletePackage>[0]
>({
  mutationFn: (options) => orpcClient.wms.deletePackage(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Package has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.package'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
