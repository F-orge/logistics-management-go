import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inTripStop } from './trip_stop';

export const paginateProofOfDelivery = (
  options: Parameters<typeof orpcClient.tms.paginateProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['tms.proofOfDelivery', 'paginate', options],
    queryFn: async ({ client }) => {
      const proofOfDeliveries =
        await orpcClient.tms.paginateProofOfDelivery(options);

      const tripStops = await client.ensureQueryData(
        inTripStop(
          proofOfDeliveries.map((row) => row.tripStopId).filter(nonEmpty),
        ),
      );

      return proofOfDeliveries.map((row) => ({
        ...row,
        tripStop: tripStops.find((subRow) => subRow.id === row.tripStopId),
      }));
    },
    enabled: !!options,
  });

export const rangeProofOfDelivery = (
  options: Parameters<typeof orpcClient.tms.rangeProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['tms.proofOfDelivery', 'range', options],
    queryFn: () => orpcClient.tms.rangeProofOfDelivery(options),
    enabled: !!options,
  });

export const inProofOfDelivery = (
  options: Parameters<typeof orpcClient.tms.inProofOfDelivery>[0],
) =>
  queryOptions({
    queryKey: ['tms.proofOfDelivery', 'in', options],
    queryFn: () => orpcClient.tms.inProofOfDelivery(options),
    enabled: !!options,
  });

export const createProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.tms.createProofOfDelivery(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.proofOfDelivery'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateProofOfDelivery(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.proofOfDelivery'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteProofOfDelivery = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteProofOfDelivery>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteProofOfDelivery>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteProofOfDelivery(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Proof Of Delivery has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.proofOfDelivery'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
