import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { inUser } from '@/queries/auth/user';

export const paginateDriverLocation = (
  options: Parameters<typeof orpcClient.dms.paginateDriverLocation>[0],
) =>
  queryOptions({
    queryKey: ['dms.driverLocation', 'paginate', options],
    queryFn: async ({ client }) => {
      const driverLocations = await orpcClient.dms.paginateDriverLocation(options);

      const drivers = await client.ensureQueryData(
        inUser(driverLocations.map((row) => row.driverId)),
      );

      return driverLocations.map((row) => ({
        ...row,
        driver: drivers.find((subRow) => subRow.id === row.driverId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeDriverLocation = (
  options: Parameters<typeof orpcClient.dms.rangeDriverLocation>[0],
) =>
  queryOptions({
    queryKey: ['dms.driverLocation', 'range', options],
    queryFn: () => orpcClient.dms.rangeDriverLocation(options),
    enabled: !!options,
  });

export const inDriverLocation = (
  options: Parameters<typeof orpcClient.dms.inDriverLocation>[0],
) =>
  queryOptions({
    queryKey: ['dms.driverLocation', 'in', options],
    queryFn: () => orpcClient.dms.inDriverLocation(options),
    enabled: !!options,
  });

export const createDriverLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createDriverLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createDriverLocation>[0]
>({
  mutationFn: (options) => orpcClient.dms.createDriverLocation(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Location: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.driverLocation'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateDriverLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateDriverLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateDriverLocation>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateDriverLocation(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Location: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.driverLocation'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteDriverLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteDriverLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteDriverLocation>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteDriverLocation(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Location has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.driverLocation'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
