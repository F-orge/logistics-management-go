import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inTrip } from './trip'

export const paginateTripStop = (options: Parameters<typeof orpcClient.tms.paginateTripStop>[0]) =>
  queryOptions({
    queryKey: ['tms.tripStop', 'paginate', options],
    queryFn: async ({ client }) => {
      const tripStops = await orpcClient.tms.paginateTripStop(options)

      return tripStops.map((row) => ({
        ...row,
      }))
    },
    enabled: !!options,
  })

export const rangeTripStop = (options: Parameters<typeof orpcClient.tms.rangeTripStop>[0]) =>
  queryOptions({
    queryKey: ['tms.tripStop', 'range', options],
    queryFn: () => orpcClient.tms.rangeTripStop(options),
    enabled: !!options,
  })

export const inTripStop = (options: Parameters<typeof orpcClient.tms.inTripStop>[0]) =>
  queryOptions({
    queryKey: ['tms.tripStop', 'in', options],
    queryFn: () => orpcClient.tms.inTripStop(options),
    enabled: !!options,
  })

export const createTripStop = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createTripStop>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createTripStop>[0]
>({
  mutationFn: (options) => orpcClient.tms.createTripStop(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip Stop: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.tripStop'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateTripStop = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateTripStop>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateTripStop>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateTripStop(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip Stop: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.tripStop'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteTripStop = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteTripStop>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteTripStop>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteTripStop(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Trip Stop has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.tripStop'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
