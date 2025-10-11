import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { inDriver } from './driver';

export const paginateDriverSchedule = (
  options: Parameters<typeof orpcClient.tms.paginateDriverSchedule>[0],
) =>
  queryOptions({
    queryKey: ['tms.driverSchedule', 'paginate', options],
    queryFn: async ({ client }) => {
      const driverSchedules =
        await orpcClient.tms.paginateDriverSchedule(options);

      const drivers = await client.ensureQueryData(
        inDriver(driverSchedules.map((row) => row.driverId)),
      );

      return driverSchedules.map((row) => ({
        ...row,
        driver: drivers.find((subRow) => subRow.id === row.driverId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeDriverSchedule = (
  options: Parameters<typeof orpcClient.tms.rangeDriverSchedule>[0],
) =>
  queryOptions({
    queryKey: ['tms.driverSchedule', 'range', options],
    queryFn: () => orpcClient.tms.rangeDriverSchedule(options),
    enabled: !!options,
  });

export const inDriverSchedule = (
  options: Parameters<typeof orpcClient.tms.inDriverSchedule>[0],
) =>
  queryOptions({
    queryKey: ['tms.driverSchedule', 'in', options],
    queryFn: () => orpcClient.tms.inDriverSchedule(options),
    enabled: !!options,
  });

export const createDriverSchedule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createDriverSchedule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createDriverSchedule>[0]
>({
  mutationFn: (options) => orpcClient.tms.createDriverSchedule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Schedule: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.driverSchedule'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateDriverSchedule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateDriverSchedule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateDriverSchedule>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateDriverSchedule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Schedule: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.driverSchedule'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteDriverSchedule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteDriverSchedule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteDriverSchedule>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteDriverSchedule(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Driver Schedule has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.driverSchedule'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
