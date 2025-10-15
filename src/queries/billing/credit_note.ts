import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inUser } from '@/queries/auth/user'
import { inDispute } from './dispute'
import { inInvoice } from './invoice'

export const paginateCreditNote = (
  options: Parameters<typeof orpcClient.billing.paginateCreditNote>[0],
) =>
  queryOptions({
    queryKey: ['billing.creditNote', 'paginate', options],
    queryFn: async ({ client }) => {
      const creditNotes = await orpcClient.billing.paginateCreditNote(options)

      const createdByUsers = await client.ensureQueryData(
        inUser(creditNotes.map((row) => row.createdByUserId).filter(nonEmpty)),
      )
      const disputes = await client.ensureQueryData(
        inDispute(creditNotes.map((row) => row.disputeId).filter(nonEmpty)),
      )
      const invoices = await client.ensureQueryData(
        inInvoice(creditNotes.map((row) => row.invoiceId).filter(nonEmpty)),
      )

      return creditNotes.map((row) => ({
        ...row,
        createdByUser: createdByUsers.find((subRow) => subRow.id === row.createdByUserId),
        dispute: disputes.find((subRow) => subRow.id === row.disputeId),
        invoice: invoices.find((subRow) => subRow.id === row.invoiceId),
      }))
    },
    enabled: !!options,
  })

export const rangeCreditNote = (
  options: Parameters<typeof orpcClient.billing.rangeCreditNote>[0],
) =>
  queryOptions({
    queryKey: ['billing.creditNote', 'range', options],
    queryFn: () => orpcClient.billing.rangeCreditNote(options),
    enabled: !!options,
  })

export const inCreditNote = (options: Parameters<typeof orpcClient.billing.inCreditNote>[0]) =>
  queryOptions({
    queryKey: ['billing.creditNote', 'in', options],
    queryFn: () => orpcClient.billing.inCreditNote(options),
    enabled: !!options,
  })

export const createCreditNote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createCreditNote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createCreditNote>[0]
>({
  mutationFn: (options) => orpcClient.billing.createCreditNote(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Credit Note: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['billing.creditNote'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateCreditNote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateCreditNote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateCreditNote>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateCreditNote(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Credit Note: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['billing.creditNote'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteCreditNote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteCreditNote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteCreditNote>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteCreditNote(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Credit Note has been deleted successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['billing.creditNote'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
