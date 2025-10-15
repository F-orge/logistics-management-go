import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/vehicle_maintenance'
import { VehicleMaintenanceRepository } from '@/repositories/tms/vehicleMaintenance'
import type { HonoVariables } from '@/server'

export const paginateVehicleMaintenance = implement(tmsContracts.paginateVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeVehicleMaintenance = implement(tmsContracts.rangeVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inVehicleMaintenance = implement(tmsContracts.inVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.in(input).execute()
  })

export const createVehicleMaintenance = implement(tmsContracts.createVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateVehicleMaintenance = implement(tmsContracts.updateVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteVehicleMaintenance = implement(tmsContracts.deleteVehicleMaintenanceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleMaintenanceRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
