import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/trip_stop'
import { TripStopRepository } from '@/repositories/tms/tripStops'
import type { HonoVariables } from '@/server'

export const paginateTripStop = implement(tmsContracts.paginateTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeTripStop = implement(tmsContracts.rangeTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inTripStop = implement(tmsContracts.inTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.in(input).execute()
  })

export const createTripStop = implement(tmsContracts.createTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateTripStop = implement(tmsContracts.updateTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteTripStop = implement(tmsContracts.deleteTripStopContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TripStopRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
