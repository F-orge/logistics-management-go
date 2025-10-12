import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';
import { paginateCarrierRate } from './carrier_rate';

export const paginateCarrier = (
  options: Parameters<typeof orpcClient.tms.paginateCarrier>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrier', 'paginate', options],
    queryFn: async ({ client }) => {
      const carriers = await orpcClient.tms.paginateCarrier(options);

      const carrierRates = await client.ensureQueryData(
        paginateCarrierRate({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'carrierId',
              operation: 'in',
              value: carriers.map((row) => row.id),
            },
          ],
        }),
      );

      return carriers.map((row) => ({
        ...row,
        rates: carrierRates.filter((subRow) => subRow.carrierId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeCarrier = (
  options: Parameters<typeof orpcClient.tms.rangeCarrier>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrier', 'range', options],
    queryFn: () => orpcClient.tms.rangeCarrier(options),
    enabled: !!options,
  });

export const inCarrier = (
  options: Parameters<typeof orpcClient.tms.inCarrier>[0],
) =>
  queryOptions({
    queryKey: ['tms.carrier', 'in', options],
    queryFn: () => orpcClient.tms.inCarrier(options),
    enabled: !!options,
  });

export const createCarrier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createCarrier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createCarrier>[0]
>({
  mutationFn: (options) => orpcClient.tms.createCarrier(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCarrier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateCarrier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateCarrier>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateCarrier(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteCarrier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteCarrier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteCarrier>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteCarrier(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Carrier has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.carrier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
