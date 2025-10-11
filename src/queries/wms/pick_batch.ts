import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inWarehouse } from './warehouse';
import { inUser } from '@/queries/auth/user';

export const paginatePickBatch = (
  options: Parameters<typeof orpcClient.wms.paginatePickBatch>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatch', 'paginate', options],
    queryFn: async ({ client }) => {
      const pickBatches = await orpcClient.wms.paginatePickBatch(options);

      const warehouses = await client.ensureQueryData(
        inWarehouse(pickBatches.map((row) => row.warehouseId).filter(nonEmpty)),
      );
      const assignedUsers = await client.ensureQueryData(
        inUser(pickBatches.map((row) => row.assignedUserId).filter(nonEmpty)),
      );

      return pickBatches.map((row) => ({
        ...row,
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        assignedUser: assignedUsers.find((subRow) => subRow.id === row.assignedUserId),
      }));
    },
    enabled: !!options,
  });

export const rangePickBatch = (
  options: Parameters<typeof orpcClient.wms.rangePickBatch>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatch', 'range', options],
    queryFn: () => orpcClient.wms.rangePickBatch(options),
    enabled: !!options,
  });

export const inPickBatch = (
  options: Parameters<typeof orpcClient.wms.inPickBatch>[0],
) =>
  queryOptions({
    queryKey: ['wms.pickBatch', 'in', options],
    queryFn: () => orpcClient.wms.inPickBatch(options),
    enabled: !!options,
  });

export const createPickBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createPickBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createPickBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.createPickBatch(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatch'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePickBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updatePickBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updatePickBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.updatePickBatch(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatch'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePickBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deletePickBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deletePickBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.deletePickBatch(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Pick Batch has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.pickBatch'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
