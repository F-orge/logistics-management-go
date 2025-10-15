import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { orpcClient } from '@/orpc/client'

export const paginateWarehouse = (
  options: Parameters<typeof orpcClient.wms.paginateWarehouse>[0],
) =>
  queryOptions({
    queryKey: ['wms.warehouse', 'paginate', options],
    queryFn: () => orpcClient.wms.paginateWarehouse(options),
    enabled: !!options,
  })

export const rangeWarehouse = (options: Parameters<typeof orpcClient.wms.rangeWarehouse>[0]) =>
  queryOptions({
    queryKey: ['wms.warehouse', 'range', options],
    queryFn: () => orpcClient.wms.rangeWarehouse(options),
    enabled: !!options,
  })

export const inWarehouse = (options: Parameters<typeof orpcClient.wms.inWarehouse>[0]) =>
  queryOptions({
    queryKey: ['wms.warehouse', 'in', options],
    queryFn: () => orpcClient.wms.inWarehouse(options),
    enabled: !!options,
  })

export const createWarehouse = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createWarehouse>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createWarehouse>[0]
>({
  mutationFn: (options) => orpcClient.wms.createWarehouse(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Warehouse: ${data.name} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.warehouse'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateWarehouse = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateWarehouse>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateWarehouse>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateWarehouse(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Warehouse: ${data.name} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.warehouse'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteWarehouse = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteWarehouse>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteWarehouse>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteWarehouse(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Warehouse has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.warehouse'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
