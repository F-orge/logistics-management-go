import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inDeliveryTask } from './delivery_task';

export const paginateProofOfDelivery = (
  options: Parameters<typeof orpcClient.dms.paginateProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['dms.proofOfDelivery', 'paginate', options],
    queryFn: async ({ client }) => {
      const proofOfDeliveries = await orpcClient.dms.paginateProofOfDelivery(options);

      const deliveryTasks = await client.ensureQueryData(
        inDeliveryTask(proofOfDeliveries.map((row) => row.deliveryTaskId).filter(nonEmpty)),
      );

      return proofOfDeliveries.map((row) => ({
        ...row,
        deliveryTask: deliveryTasks.find((subRow) => subRow.id === row.deliveryTaskId),
      }));
    },
    enabled: !!options,
  });

export const rangeProofOfDelivery = (
  options: Parameters<typeof orpcClient.dms.rangeProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['dms.proofOfDelivery', 'range', options],
    queryFn: () => orpcClient.dms.rangeProofOfDelivery(options),
    enabled: !!options,
  });

export const inProofOfDelivery = (
  options: Parameters<typeof orpcClient.dms.inProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['dms.proofOfDelivery', 'in', options],
    queryFn: () => orpcClient.dms.inProofOfDelivery(options),
    enabled: !!options,
  });

export const createProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.dms.createProofOfDelivery(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.proofOfDelivery'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateProofOfDelivery(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.proofOfDelivery'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteProofOfDelivery(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.proofOfDelivery'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
