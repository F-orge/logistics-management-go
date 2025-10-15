import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { orpcClient } from '@/orpc/client'
import { paginateGeofenceEvent } from './geofence_event'

export const paginateGeofence = (options: Parameters<typeof orpcClient.tms.paginateGeofence>[0]) =>
  queryOptions({
    queryKey: ['tms.geofence', 'paginate', options],
    queryFn: async ({ client }) => {
      const geofence = await orpcClient.tms.paginateGeofence(options)

      const events = await client.ensureQueryData(
        paginateGeofenceEvent({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'geofenceId',
              operation: 'in',
              value: geofence.map((row) => row.id),
            },
          ],
        }),
      )

      return geofence.map((row) => ({
        ...row,
        events: events.map((subRow) => subRow.geofenceId === row.id),
      }))
    },
    enabled: !!options,
  })

export const rangeGeofence = (options: Parameters<typeof orpcClient.tms.rangeGeofence>[0]) =>
  queryOptions({
    queryKey: ['tms.geofence', 'range', options],
    queryFn: () => orpcClient.tms.rangeGeofence(options),
    enabled: !!options,
  })

export const inGeofence = (options: Parameters<typeof orpcClient.tms.inGeofence>[0]) =>
  queryOptions({
    queryKey: ['tms.geofence', 'in', options],
    queryFn: () => orpcClient.tms.inGeofence(options),
    enabled: !!options,
  })

export const createGeofence = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createGeofence>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createGeofence>[0]
>({
  mutationFn: (options) => orpcClient.tms.createGeofence(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence: ${data.name} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofence'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateGeofence = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateGeofence>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateGeofence>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateGeofence(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence: ${data.name} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofence'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteGeofence = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteGeofence>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteGeofence>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteGeofence(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofence'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
