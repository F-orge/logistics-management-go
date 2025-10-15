import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/vehicle'
import { VehicleRepository } from '@/repositories/tms/vehicles'
import type { HonoVariables } from '@/server'

export const paginateVehicle = implement(tmsContracts.paginateVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeVehicle = implement(tmsContracts.rangeVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inVehicle = implement(tmsContracts.inVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.in(input).execute()
  })

export const createVehicle = implement(tmsContracts.createVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateVehicle = implement(tmsContracts.updateVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteVehicle = implement(tmsContracts.deleteVehicleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new VehicleRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
