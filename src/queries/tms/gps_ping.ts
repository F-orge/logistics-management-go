import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inVehicle } from './vehicle';

export const paginateGpsPing = (
  options: Parameters<typeof orpcClient.tms.paginateGpsPing>[0],
) =>
  queryOptions({
    queryKey: ['tms.gpsPing', 'paginate', options],
    queryFn: async ({ client }) => {
      const gpsPings = await orpcClient.tms.paginateGpsPing(options);

      const vehicles = await client.ensureQueryData(
        inVehicle(gpsPings.map((row) => row.vehicleId).filter(nonEmpty)),
      );

      return gpsPings.map((row) => ({
        ...row,
        vehicle: vehicles.find((subRow) => subRow.id === row.vehicleId),
      }));
    },
    enabled: !!options,
  });

export const rangeGpsPing = (
  options: Parameters<typeof orpcClient.tms.rangeGpsPing>[0],
) =>
  queryOptions({
    queryKey: ['tms.gpsPing', 'range', options],
    queryFn: () => orpcClient.tms.rangeGpsPing(options),
    enabled: !!options,
  });

export const inGpsPing = (
  options: Parameters<typeof orpcClient.tms.inGpsPing>[0],
) =>
  queryOptions({
    queryKey: ['tms.gpsPing', 'in', options],
    queryFn: () => orpcClient.tms.inGpsPing(options),
    enabled: !!options,
  });

export const createGpsPing = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createGpsPing>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createGpsPing>[0]
>({
  mutationFn: (options) => orpcClient.tms.createGpsPing(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `GPS Ping: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.gpsPing'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateGpsPing = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateGpsPing>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateGpsPing>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateGpsPing(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `GPS Ping: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.gpsPing'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteGpsPing = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteGpsPing>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteGpsPing>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteGpsPing(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `GPS Ping has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.gpsPing'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
