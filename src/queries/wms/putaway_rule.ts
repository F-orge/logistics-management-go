import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inLocation } from './location';
import { inProduct } from './product';
import { inWarehouse } from './warehouse';

export const paginatePutawayRule = (
  options: Parameters<typeof orpcClient.wms.paginatePutawayRule>[0],
) =>
  queryOptions({
    queryKey: ['wms.putawayRule', 'paginate', options],
    queryFn: async ({ client }) => {
      const putawayRules = await orpcClient.wms.paginatePutawayRule(options);

      const products = await client.ensureQueryData(
        inProduct(putawayRules.map((row) => row.productId).filter(nonEmpty)),
      );
      const warehouses = await client.ensureQueryData(
        inWarehouse(
          putawayRules.map((row) => row.warehouseId).filter(nonEmpty),
        ),
      );
      const preferredLocations = await client.ensureQueryData(
        inLocation(
          putawayRules.map((row) => row.preferredLocationId).filter(nonEmpty),
        ),
      );

      return putawayRules.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        preferredLocation: preferredLocations.find(
          (subRow) => subRow.id === row.preferredLocationId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangePutawayRule = (
  options: Parameters<typeof orpcClient.wms.rangePutawayRule>[0],
) =>
  queryOptions({
    queryKey: ['wms.putawayRule', 'range', options],
    queryFn: () => orpcClient.wms.rangePutawayRule(options),
    enabled: !!options,
  });

export const inPutawayRule = (
  options: Parameters<typeof orpcClient.wms.inPutawayRule>[0],
) =>
  queryOptions({
    queryKey: ['wms.putawayRule', 'in', options],
    queryFn: () => orpcClient.wms.inPutawayRule(options),
    enabled: !!options,
  });

export const createPutawayRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createPutawayRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createPutawayRule>[0]
>({
  mutationFn: (options) => orpcClient.wms.createPutawayRule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Putaway Rule: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.putawayRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePutawayRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updatePutawayRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updatePutawayRule>[0]
>({
  mutationFn: (options) => orpcClient.wms.updatePutawayRule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Putaway Rule: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.putawayRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePutawayRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deletePutawayRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deletePutawayRule>[0]
>({
  mutationFn: (options) => orpcClient.wms.deletePutawayRule(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Putaway Rule has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.putawayRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
