import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inDriver } from './driver'
import { inTrip } from './trip'

export const paginateExpense = (options: Parameters<typeof orpcClient.tms.paginateExpense>[0]) =>
  queryOptions({
    queryKey: ['tms.expense', 'paginate', options],
    queryFn: async ({ client }) => {
      const expenses = await orpcClient.tms.paginateExpense(options)

      const trips = await client.ensureQueryData(
        inTrip(expenses.map((row) => row.tripId).filter(nonEmpty)),
      )
      const drivers = await client.ensureQueryData(
        inDriver(expenses.map((row) => row.driverId).filter(nonEmpty)),
      )

      return expenses.map((row) => ({
        ...row,
        trip: trips.find((subRow) => subRow.id === row.tripId),
        driver: drivers.find((subRow) => subRow.id === row.driverId),
      }))
    },
    enabled: !!options,
  })

export const rangeExpense = (options: Parameters<typeof orpcClient.tms.rangeExpense>[0]) =>
  queryOptions({
    queryKey: ['tms.expense', 'range', options],
    queryFn: () => orpcClient.tms.rangeExpense(options),
    enabled: !!options,
  })

export const inExpense = (options: Parameters<typeof orpcClient.tms.inExpense>[0]) =>
  queryOptions({
    queryKey: ['tms.expense', 'in', options],
    queryFn: () => orpcClient.tms.inExpense(options),
    enabled: !!options,
  })

export const createExpense = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createExpense>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createExpense>[0]
>({
  mutationFn: (options) => orpcClient.tms.createExpense(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Expense: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.expense'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateExpense = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateExpense>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateExpense>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateExpense(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Expense: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.expense'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteExpense = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteExpense>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteExpense>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteExpense(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Expense has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.expense'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
