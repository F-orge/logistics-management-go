import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/gps_ping'
import { GpsPingRepository } from '@/repositories/tms/gpsPings'
import type { HonoVariables } from '@/server'

export const paginateGpsPing = implement(tmsContracts.paginateGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeGpsPing = implement(tmsContracts.rangeGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inGpsPing = implement(tmsContracts.inGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.in(input).execute()
  })

export const createGpsPing = implement(tmsContracts.createGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateGpsPing = implement(tmsContracts.updateGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteGpsPing = implement(tmsContracts.deleteGpsPingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new GpsPingRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
