import { oc } from '@orpc/contract'
import { VehicleMaintenanceRepository } from '@packages/db/repositories/tms'
import { VehicleMaintenanceSchema } from '@packages/db/schemas/tms/vehicle_maintenance'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginateVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.paginateOptionSchema)
  .output(VehicleMaintenanceSchema.array())

export const RangeVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.rangeOptionSchema)
  .output(VehicleMaintenanceSchema.array())

export const AnyVehicleMaintenanceContract = oc
  .input(z.uuid().array())
  .output(VehicleMaintenanceSchema.array())

export const InsertVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.InsertSchema)
  .output(VehicleMaintenanceSchema)

export const InsertManyVehicleMaintenanceContract = oc
  .input(VehicleMaintenanceRepository.schemas.InsertSchema.array())
  .output(VehicleMaintenanceSchema.array())

export const UpdateVehicleMaintenanceContract = oc
  .input(z.object({ id: z.uuid(), value: VehicleMaintenanceRepository.schemas.UpdateSchema }))
  .output(VehicleMaintenanceSchema)

export const RemoveVehicleMaintenanceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
