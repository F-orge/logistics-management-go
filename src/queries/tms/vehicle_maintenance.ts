import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inVehicle } from './vehicle';

export const paginateVehicleMaintenance = (
  options: Parameters<typeof orpcClient.tms.paginateVehicleMaintenance>[0],
) =>
  queryOptions({
    queryKey: ['tms.vehicleMaintenance', 'paginate', options],
    queryFn: async ({ client }) => {
      const vehicleMaintenances = await orpcClient.tms.paginateVehicleMaintenance(options);

      const vehicles = await client.ensureQueryData(
        inVehicle(vehicleMaintenances.map((row) => row.vehicleId).filter(nonEmpty)),
      );

      return vehicleMaintenances.map((row) => ({
        ...row,
        vehicle: vehicles.find((subRow) => subRow.id === row.vehicleId),
      }));
    },
    enabled: !!options,
  });

export const rangeVehicleMaintenance = (
  options: Parameters<typeof orpcClient.tms.rangeVehicleMaintenance>[0],
) =>
  queryOptions({
    queryKey: ['tms.vehicleMaintenance', 'range', options],
    queryFn: () => orpcClient.tms.rangeVehicleMaintenance(options),
    enabled: !!options,
  });

export const inVehicleMaintenance = (
  options: Parameters<typeof orpcClient.tms.inVehicleMaintenance>[0],
) =>
  queryOptions({
    queryKey: ['tms.vehicleMaintenance', 'in', options],
    queryFn: () => orpcClient.tms.inVehicleMaintenance(options),
    enabled: !!options,
  });

export const createVehicleMaintenance = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createVehicleMaintenance>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createVehicleMaintenance>[0]
>({
  mutationFn: (options) => orpcClient.tms.createVehicleMaintenance(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle Maintenance: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.vehicleMaintenance'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateVehicleMaintenance = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateVehicleMaintenance>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateVehicleMaintenance>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateVehicleMaintenance(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle Maintenance: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.vehicleMaintenance'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteVehicleMaintenance = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteVehicleMaintenance>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteVehicleMaintenance>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteVehicleMaintenance(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle Maintenance has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.vehicleMaintenance'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
