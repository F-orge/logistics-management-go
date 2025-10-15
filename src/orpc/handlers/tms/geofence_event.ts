import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/geofence_event'
import { GeofenceEventRepository } from '@/repositories/tms/geofenceEvents'
import type { HonoVariables } from '@/server'

export const paginateGeofenceEvent = implement(tmsContracts.paginateGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeGeofenceEvent = implement(tmsContracts.rangeGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inGeofenceEvent = implement(tmsContracts.inGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.in(input).execute()
  })

export const createGeofenceEvent = implement(tmsContracts.createGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateGeofenceEvent = implement(tmsContracts.updateGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteGeofenceEvent = implement(tmsContracts.deleteGeofenceEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GeofenceEventRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
