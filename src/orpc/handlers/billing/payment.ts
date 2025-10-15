import { implement } from '@orpc/server'
import * as billingContracts from '@/orpc/contracts/billing/payment'
import { PaymentRepository } from '@/repositories/billing/payments'
import type { HonoVariables } from '@/server'

export const paginatePayment = implement(billingContracts.paginatePaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangePayment = implement(billingContracts.rangePaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inPayment = implement(billingContracts.inPaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.in(input).execute()
  })

export const createPayment = implement(billingContracts.createPaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updatePayment = implement(billingContracts.updatePaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deletePayment = implement(billingContracts.deletePaymentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PaymentRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
