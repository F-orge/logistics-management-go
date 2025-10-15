import { implement } from '@orpc/server'
import { jsonObjectFrom } from 'kysely/helpers/postgres'
import * as crmContracts from '@/orpc/contracts/crm'
import { LeadRepository } from '@/repositories/crm/leads'
import type { HonoVariables } from '@/server'

export const paginateLead = implement(crmContracts.paginateLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeLead = implement(crmContracts.rangeLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inLead = implement(crmContracts.inLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.in(input).execute()
  })

export const createLead = implement(crmContracts.createLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateLead = implement(crmContracts.updateLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteLead = implement(crmContracts.deleteLeadContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new LeadRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
