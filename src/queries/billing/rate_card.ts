import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inUser } from '@/queries/auth/user'

export const paginateRateCard = (
  options: Parameters<typeof orpcClient.billing.paginateRateCard>[0],
) =>
  queryOptions({
    queryKey: ['billing.rateCard', 'paginate', options],
    queryFn: async ({ client }) => {
      const rateCards = await orpcClient.billing.paginateRateCard(options)

      const createdByUsers = await client.ensureQueryData(
        inUser(rateCards.map((row) => row.createdByUserId).filter(nonEmpty)),
      )

      return rateCards.map((row) => ({
        ...row,
        createdByUser: createdByUsers.find((subRow) => subRow.id === row.createdByUserId),
      }))
    },
    enabled: !!options,
  })

export const rangeRateCard = (options: Parameters<typeof orpcClient.billing.rangeRateCard>[0]) =>
  queryOptions({
    queryKey: ['billing.rateCard', 'range', options],
    queryFn: () => orpcClient.billing.rangeRateCard(options),
    enabled: !!options,
  })

export const inRateCard = (options: Parameters<typeof orpcClient.billing.inRateCard>[0]) =>
  queryOptions({
    queryKey: ['billing.rateCard', 'in', options],
    queryFn: () => orpcClient.billing.inRateCard(options),
    enabled: !!options,
  })

export const createRateCard = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createRateCard>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createRateCard>[0]
>({
  mutationFn: (options) => orpcClient.billing.createRateCard(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Card: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['billing.rateCard'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateRateCard = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateRateCard>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateRateCard>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateRateCard(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Card: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['billing.rateCard'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteRateCard = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteRateCard>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteRateCard>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteRateCard(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Card has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['billing.rateCard'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
