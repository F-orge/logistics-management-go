import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsVehicleMaintenance,
  removeTmsVehicleMaintenance,
  selectTmsVehicleMaintenance,
  updateTmsVehicleMaintenance,
} from '@/actions/tms/vehicleMaintenance';
import {
  tmsVehicleMaintenanceInsertSchema,
  tmsVehicleMaintenanceSchema,
  tmsVehicleMaintenanceUpdateSchema,
} from '@/schemas/tms/vehicle_maintenance';

export const tmsVehicleMaintenanceQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.vehicleMaintenance', page, perPage],
    queryFn: () =>
      selectTmsVehicleMaintenance({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsVehicleMaintenanceCreateMutationOption = mutationOptions<
  z.infer<typeof tmsVehicleMaintenanceSchema>,
  void,
  z.infer<typeof tmsVehicleMaintenanceInsertSchema>
>({
  mutationFn: (value) => createTmsVehicleMaintenance({ data: value }),
});

export const tmsVehicleMaintenanceUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsVehicleMaintenanceSchema>,
    void,
    z.infer<typeof tmsVehicleMaintenanceUpdateSchema>
  >({
    mutationFn: (value) => updateTmsVehicleMaintenance({ data: { id, value } }),
  });

export const tmsVehicleMaintenanceRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsVehicleMaintenance({ data: { id } }),
});