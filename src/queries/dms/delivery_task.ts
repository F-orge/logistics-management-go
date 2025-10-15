import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inProduct } from '@/queries/crm/products'
import { inDeliveryRoute } from './delivery_route'
import { paginateTaskEvent } from './task_event'

export const paginateDeliveryTask = (
  options: Parameters<typeof orpcClient.dms.paginateDeliveryTask>[0],
) =>
  queryOptions({
    queryKey: ['dms.deliveryTask', 'paginate', options],
    queryFn: async ({ client }) => {
      const deliveryTasks = await orpcClient.dms.paginateDeliveryTask(options)

      const deliveryRoutes = await client.ensureQueryData(
        inDeliveryRoute(deliveryTasks.map((row) => row.deliveryRouteId).filter(nonEmpty)),
      )

      const packages = await client.ensureQueryData(
        inProduct(deliveryTasks.map((row) => row.packageId).filter(nonEmpty)),
      )

      const taskEvents = await client.ensureQueryData(
        paginateTaskEvent({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'deliveryTaskId',
              operation: 'in',
              value: deliveryTasks.map((row) => row.id),
            },
          ],
        }),
      )

      return deliveryTasks.map((row) => ({
        ...row,
        deliveryRoute: deliveryRoutes.find((subRow) => subRow.id === row.deliveryRouteId),
        package: packages.find((subRow) => subRow.id === row.packageId),
        taskEvents: taskEvents.filter((subRow) => subRow.deliveryTaskId === row.id),
      }))
    },
    enabled: !!options,
  })

export const rangeDeliveryTask = (
  options: Parameters<typeof orpcClient.dms.rangeDeliveryTask>[0],
) =>
  queryOptions({
    queryKey: ['dms.deliveryTask', 'range', options],
    queryFn: () => orpcClient.dms.rangeDeliveryTask(options),
    enabled: !!options,
  })

export const inDeliveryTask = (options: Parameters<typeof orpcClient.dms.inDeliveryTask>[0]) =>
  queryOptions({
    queryKey: ['dms.deliveryTask', 'in', options],
    queryFn: () => orpcClient.dms.inDeliveryTask(options),
    enabled: !!options,
  })

export const createDeliveryTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createDeliveryTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createDeliveryTask>[0]
>({
  mutationFn: (options) => orpcClient.dms.createDeliveryTask(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Delivery Task: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryTask'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateDeliveryTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateDeliveryTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateDeliveryTask>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateDeliveryTask(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Delivery Task: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryTask'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteDeliveryTask = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteDeliveryTask>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteDeliveryTask>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteDeliveryTask(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Delivery Task has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryTask'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
