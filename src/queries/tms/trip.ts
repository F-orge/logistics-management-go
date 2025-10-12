import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inDriver } from './driver';
import { inVehicle } from './vehicle';
import { paginateTripStop } from './trip_stop';

export const paginateTrip = (
  options: Parameters<typeof orpcClient.tms.paginateTrip>[0],
) =>
  queryOptions({
    queryKey: ['tms.trip', 'paginate', options],
    queryFn: async ({ client }) => {
      const trips = await orpcClient.tms.paginateTrip(options);

      const drivers = await client.ensureQueryData(
        inDriver(trips.map((row) => row.driverId).filter(nonEmpty)),
      );

      const vehicles = await client.ensureQueryData(
        inVehicle(trips.map((row) => row.vehicleId).filter(nonEmpty)),
      );

      const stops = await client.ensureQueryData(
        paginateTripStop({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'tripId',
              operation: 'in',
              value: trips.map((row) => row.id),
            },
          ],
        }),
      );

      return trips.map((row) => ({
        ...row,
        driver: drivers.find((subRow) => subRow.id === row.driverId),
        vehicle: vehicles.find((subRow) => subRow.id === row.vehicleId),
        stops: stops.filter((subRow) => subRow.tripId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeTrip = (
  options: Parameters<typeof orpcClient.tms.rangeTrip>[0],
) =>
  queryOptions({
    queryKey: ['tms.trip', 'range', options],
    queryFn: () => orpcClient.tms.rangeTrip(options),
    enabled: !!options,
  });

export const inTrip = (options: Parameters<typeof orpcClient.tms.inTrip>[0]) =>
  queryOptions({
    queryKey: ['tms.trip', 'in', options],
    queryFn: () => orpcClient.tms.inTrip(options),
    enabled: !!options,
  });

export const createTrip = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createTrip>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createTrip>[0]
>({
  mutationFn: (options) => orpcClient.tms.createTrip(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.trip'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateTrip = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateTrip>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateTrip>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateTrip(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.trip'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteTrip = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteTrip>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteTrip>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteTrip(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.trip'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
