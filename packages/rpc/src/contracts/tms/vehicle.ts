import { oc } from "@orpc/contract";
import {
  VehicleMaintenanceRepository,
  VehicleRepository,
} from "@packages/db/repositories/tms";
import { VehicleSchema } from "@packages/db/schemas/tms/vehicle";
import { VehicleMaintenanceSchema } from "@packages/db/schemas/tms/vehicle_maintenance";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = VehicleSchema.extend({
  maintenances: VehicleMaintenanceSchema.array(),
});

export const PaginateVehicleContract = oc
  .input(VehicleRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array());

export const RangeVehicleContract = oc
  .input(VehicleRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array());

export const AnyVehicleContract = oc
  .input(z.uuid().array())
  .output(OutputSchema.array());

export const InsertVehicleContract = oc
  .input(VehicleRepository.schemas.InsertSchema)
  .output(OutputSchema);

export const InsertManyVehicleContract = oc
  .input(VehicleRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array());

export const UpdateVehicleContract = oc
  .input(
    z.object({ id: z.uuid(), value: VehicleRepository.schemas.UpdateSchema })
  )
  .output(OutputSchema);

export const RemoveVehicleContract = oc
  .input(z.uuid())
  .output(
    z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString())
  );

export const InsertVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.InsertSchema)
  .output(OutputSchema);

export const InsertManyVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array());

export const UpdateVehicleMaintenanceContract = oc
  .input(
    z.object({
      id: z.uuid(),
      value: VehicleMaintenanceRepository.schemas.UpdateSchema,
    })
  )
  .output(OutputSchema);

export const RemoveVehicleMaintenanceContract = oc
  .input(z.uuid())
  .output(
    z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString())
  );
