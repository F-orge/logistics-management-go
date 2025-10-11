import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inTrip } from './trip';

export const paginateRoute = (
  options: Parameters<typeof orpcClient.tms.paginateRoute>[0],
) =>
  queryOptions({
    queryKey: ['tms.route', 'paginate', options],
    queryFn: async ({ client }) => {
      const routes = await orpcClient.tms.paginateRoute(options);

      const trips = await client.ensureQueryData(
        inTrip(routes.map((row) => row.tripId).filter(nonEmpty)),
      );

      return routes.map((row) => ({
        ...row,
        trip: trips.find((subRow) => subRow.id === row.tripId),
      }));
    },
    enabled: !!options,
  });

export const rangeRoute = (
  options: Parameters<typeof orpcClient.tms.rangeRoute>[0],
) =>
  queryOptions({
    queryKey: ['tms.route', 'range', options],
    queryFn: () => orpcClient.tms.rangeRoute(options),
    enabled: !!options,
  });

export const inRoute = (
  options: Parameters<typeof orpcClient.tms.inRoute>[0],
) =>
  queryOptions({
    queryKey: ['tms.route', 'in', options],
    queryFn: () => orpcClient.tms.inRoute(options),
    enabled: !!options,
  });

export const createRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createRoute>[0]
>({
  mutationFn: (options) => orpcClient.tms.createRoute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Route: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.route'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateRoute>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateRoute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Route: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.route'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteRoute>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteRoute(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Route has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.route'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
