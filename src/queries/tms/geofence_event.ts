import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inGeofence } from './geofence'
import { inVehicle } from './vehicle'

export const paginateGeofenceEvent = (
  options: Parameters<typeof orpcClient.tms.paginateGeofenceEvent>[0],
) =>
  queryOptions({
    queryKey: ['tms.geofenceEvent', 'paginate', options],
    queryFn: async ({ client }) => {
      const geofenceEvents = await orpcClient.tms.paginateGeofenceEvent(options)

      const vehicles = await client.ensureQueryData(
        inVehicle(geofenceEvents.map((row) => row.vehicleId).filter(nonEmpty)),
      )

      return geofenceEvents.map((row) => ({
        ...row,
        vehicle: vehicles.find((subRow) => subRow.id === row.vehicleId),
      }))
    },
    enabled: !!options,
  })

export const rangeGeofenceEvent = (
  options: Parameters<typeof orpcClient.tms.rangeGeofenceEvent>[0],
) =>
  queryOptions({
    queryKey: ['tms.geofenceEvent', 'range', options],
    queryFn: () => orpcClient.tms.rangeGeofenceEvent(options),
    enabled: !!options,
  })

export const inGeofenceEvent = (options: Parameters<typeof orpcClient.tms.inGeofenceEvent>[0]) =>
  queryOptions({
    queryKey: ['tms.geofenceEvent', 'in', options],
    queryFn: () => orpcClient.tms.inGeofenceEvent(options),
    enabled: !!options,
  })

export const createGeofenceEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createGeofenceEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createGeofenceEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.createGeofenceEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence Event: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofenceEvent'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateGeofenceEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateGeofenceEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateGeofenceEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateGeofenceEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence Event: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofenceEvent'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteGeofenceEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteGeofenceEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteGeofenceEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteGeofenceEvent(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Geofence Event has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.geofenceEvent'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
