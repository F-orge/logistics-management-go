import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inCarrier } from './carrier';

export const paginateCarrierRate = (
  options: Parameters<typeof orpcClient.tms.paginateCarrierRate>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrierRate', 'paginate', options],
    queryFn: async ({ client }) => {
      const carrierRates = await orpcClient.tms.paginateCarrierRate(options);

      const carriers = await client.ensureQueryData(
        inCarrier(carrierRates.map((row) => row.carrierId).filter(nonEmpty)),
      );

      return carrierRates.map((row) => ({
        ...row,
        carrier: carriers.find((subRow) => subRow.id === row.carrierId),
      }));
    },
    enabled: !!options,
  });

export const rangeCarrierRate = (
  options: Parameters<typeof orpcClient.tms.rangeCarrierRate>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrierRate', 'range', options],
    queryFn: () => orpcClient.tms.rangeCarrierRate(options),
    enabled: !!options,
  });

export const inCarrierRate = (
  options: Parameters<typeof orpcClient.tms.inCarrierRate>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrierRate', 'in', options],
    queryFn: () => orpcClient.tms.inCarrierRate(options),
    enabled: !!options,
  });

export const createCarrierRate = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createCarrierRate>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createCarrierRate>[0]
>({
  mutationFn: (options) => orpcClient.tms.createCarrierRate(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier Rate: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrierRate'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCarrierRate = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateCarrierRate>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateCarrierRate>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateCarrierRate(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier Rate: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrierRate'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteCarrierRate = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteCarrierRate>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteCarrierRate>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteCarrierRate(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier Rate has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrierRate'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
