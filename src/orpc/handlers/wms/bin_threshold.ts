import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/bin_threshold'
import { BinThresholdRepository } from '@/repositories/wms/binThresholds'
import type { HonoVariables } from '@/server'

export const paginateBinThreshold = implement(wmsContracts.paginateBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeBinThreshold = implement(wmsContracts.rangeBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inBinThreshold = implement(wmsContracts.inBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.in(input).execute()
  })

export const createBinThreshold = implement(wmsContracts.createBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateBinThreshold = implement(wmsContracts.updateBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteBinThreshold = implement(wmsContracts.deleteBinThresholdContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new BinThresholdRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
