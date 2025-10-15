import { implement } from '@orpc/server'
import * as billingContracts from '@/orpc/contracts/billing/rate_rule'
import { RateRuleRepository } from '@/repositories/billing/rateRules'
import type { HonoVariables } from '@/server'

export const paginateRateRule = implement(billingContracts.paginateRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeRateRule = implement(billingContracts.rangeRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inRateRule = implement(billingContracts.inRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.in(input).execute()
  })

export const createRateRule = implement(billingContracts.createRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateRateRule = implement(billingContracts.updateRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteRateRule = implement(billingContracts.deleteRateRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateRuleRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
