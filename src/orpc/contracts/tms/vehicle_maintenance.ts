import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsVehicleMaintenanceInsertSchema,
  tmsVehicleMaintenanceSchema,
  tmsVehicleMaintenanceUpdateSchema,
} from '@/schemas/tms/vehicle_maintenance';

export const paginateVehicleMaintenanceContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsVehicleMaintenanceSchema),
        sort: sortTransformer(tmsVehicleMaintenanceSchema),
      }),
    ),
  )
  .output(z.array(tmsVehicleMaintenanceSchema));

export const rangeVehicleMaintenanceContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsVehicleMaintenanceSchema),
        sort: sortTransformer(tmsVehicleMaintenanceSchema),
      }),
    ),
  )
  .output(z.array(tmsVehicleMaintenanceSchema));

export const inVehicleMaintenanceContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsVehicleMaintenanceSchema));

export const createVehicleMaintenanceContract = oc
  .input(tmsVehicleMaintenanceInsertSchema)
  .output(tmsVehicleMaintenanceSchema);

export const updateVehicleMaintenanceContract = oc
  .input(z.object({ id: z.uuid(), value: tmsVehicleMaintenanceUpdateSchema }))
  .output(tmsVehicleMaintenanceSchema);

export const deleteVehicleMaintenanceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
