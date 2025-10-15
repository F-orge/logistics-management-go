import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/reorder_point'
import { ReorderPointRepository } from '@/repositories/wms/reorderPoints'
import type { HonoVariables } from '@/server'

export const paginateReorderPoint = implement(wmsContracts.paginateReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeReorderPoint = implement(wmsContracts.rangeReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inReorderPoint = implement(wmsContracts.inReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.in(input).execute()
  })

export const createReorderPoint = implement(wmsContracts.createReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateReorderPoint = implement(wmsContracts.updateReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteReorderPoint = implement(wmsContracts.deleteReorderPointContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReorderPointRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
