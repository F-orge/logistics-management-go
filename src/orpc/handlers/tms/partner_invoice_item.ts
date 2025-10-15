import { implement } from '@orpc/server'
import * as tmsContracts from '@/orpc/contracts/tms/partner_invoice_item'
import { PartnerInvoiceItemRepository } from '@/repositories/tms/partnerInvoiceItems'
import type { HonoVariables } from '@/server'

export const paginatePartnerInvoiceItem = implement(tmsContracts.paginatePartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangePartnerInvoiceItem = implement(tmsContracts.rangePartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inPartnerInvoiceItem = implement(tmsContracts.inPartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.in(input).execute()
  })

export const createPartnerInvoiceItem = implement(tmsContracts.createPartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updatePartnerInvoiceItem = implement(tmsContracts.updatePartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deletePartnerInvoiceItem = implement(tmsContracts.deletePartnerInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceItemRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
