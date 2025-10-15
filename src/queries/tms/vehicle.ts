import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { orpcClient } from '@/orpc/client'
import { paginateVehicleMaintenance } from './vehicle_maintenance'

export const paginateVehicle = (options: Parameters<typeof orpcClient.tms.paginateVehicle>[0]) =>
  queryOptions({
    queryKey: ['tms.vehicle', 'paginate', options],
    queryFn: async ({ client }) => {
      const vehicles = await orpcClient.tms.paginateVehicle(options)

      const maintenances = client.ensureQueryData(
        paginateVehicleMaintenance({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'vehicleId',
              operation: 'in',
              value: vehicles.map((row) => row.id),
            },
          ],
        }),
      )

      return vehicles.map((row) => ({ ...row }))
    },
    enabled: !!options,
  })

export const rangeVehicle = (options: Parameters<typeof orpcClient.tms.rangeVehicle>[0]) =>
  queryOptions({
    queryKey: ['tms.vehicle', 'range', options],
    queryFn: () => orpcClient.tms.rangeVehicle(options),
    enabled: !!options,
  })

export const inVehicle = (options: Parameters<typeof orpcClient.tms.inVehicle>[0]) =>
  queryOptions({
    queryKey: ['tms.vehicle', 'in', options],
    queryFn: () => orpcClient.tms.inVehicle(options),
    enabled: !!options,
  })

export const createVehicle = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createVehicle>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createVehicle>[0]
>({
  mutationFn: (options) => orpcClient.tms.createVehicle(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.vehicle'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateVehicle = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateVehicle>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateVehicle>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateVehicle(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.vehicle'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteVehicle = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteVehicle>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteVehicle>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteVehicle(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Vehicle has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.vehicle'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
