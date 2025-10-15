import { implement } from '@orpc/server'
import * as billingContracts from '@/orpc/contracts/billing/invoice'
import { InvoiceRepository } from '@/repositories/billing/invoices'
import type { HonoVariables } from '@/server'

export const paginateInvoice = implement(billingContracts.paginateInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeInvoice = implement(billingContracts.rangeInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inInvoice = implement(billingContracts.inInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.in(input).execute()
  })

export const createInvoice = implement(billingContracts.createInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateInvoice = implement(billingContracts.updateInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteInvoice = implement(billingContracts.deleteInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
