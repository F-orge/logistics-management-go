import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { inUser } from '@/queries/auth/user';
import { paginateDriverSchedule } from './driver_schedule';

export const paginateDriver = (
  options: Parameters<typeof orpcClient.tms.paginateDriver>[0],
) =>
  queryOptions({
    queryKey: ['tms.driver', 'paginate', options],
    queryFn: async ({ client }) => {
      const drivers = await orpcClient.tms.paginateDriver(options);

      const users = await client.ensureQueryData(
        inUser(drivers.map((row) => row.userId)),
      );

      const schedules = await client.ensureQueryData(
        paginateDriverSchedule({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'driverId',
              operation: 'in',
              value: drivers.map((row) => row.id),
            },
          ],
        }),
      );

      return drivers.map((row) => ({
        ...row,
        user: users.find((subRow) => subRow.id === row.userId)!,
        schedules: schedules.filter((subRow) => subRow.driverId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeDriver = (
  options: Parameters<typeof orpcClient.tms.rangeDriver>[0],
) =>
  queryOptions({
    queryKey: ['tms.driver', 'range', options],
    queryFn: () => orpcClient.tms.rangeDriver(options),
    enabled: !!options,
  });

export const inDriver = (
  options: Parameters<typeof orpcClient.tms.inDriver>[0],
) =>
  queryOptions({
    queryKey: ['tms.driver', 'in', options],
    queryFn: () => orpcClient.tms.inDriver(options),
    enabled: !!options,
  });

export const createDriver = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createDriver>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createDriver>[0]
>({
  mutationFn: (options) => orpcClient.tms.createDriver(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.driver'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateDriver = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateDriver>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateDriver>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateDriver(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.driver'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteDriver = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteDriver>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteDriver>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteDriver(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.driver'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
