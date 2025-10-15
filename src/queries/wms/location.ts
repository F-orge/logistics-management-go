import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inWarehouse } from './warehouse'

export const paginateLocation = (options: Parameters<typeof orpcClient.wms.paginateLocation>[0]) =>
  queryOptions({
    queryKey: ['wms.location', 'paginate', options],
    queryFn: async ({ client }) => {
      const locations = await orpcClient.wms.paginateLocation(options)

      const warehouses = await client.ensureQueryData(
        inWarehouse(locations.map((row) => row.warehouseId).filter(nonEmpty)),
      )

      const parentLocations = await client.ensureQueryData(
        inLocation(locations.map((row) => row.parentLocationId).filter(nonEmpty)),
      )

      return locations.map((row) => ({
        ...row,
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        parentLocation: parentLocations.find((subRow) => subRow.id === row.parentLocationId),
      }))
    },
    enabled: !!options,
  })

export const rangeLocation = (options: Parameters<typeof orpcClient.wms.rangeLocation>[0]) =>
  queryOptions({
    queryKey: ['wms.location', 'range', options],
    queryFn: () => orpcClient.wms.rangeLocation(options),
    enabled: !!options,
  })

export const inLocation = (options: Parameters<typeof orpcClient.wms.inLocation>[0]) =>
  queryOptions({
    queryKey: ['wms.location', 'in', options],
    queryFn: () => orpcClient.wms.inLocation(options),
    enabled: !!options,
  })

export const createLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createLocation>[0]
>({
  mutationFn: (options) => orpcClient.wms.createLocation(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Location: ${data.name} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.location'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateLocation>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateLocation(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Location: ${data.name} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.location'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteLocation = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteLocation>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteLocation>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteLocation(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Location has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.location'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
