import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inProduct } from './product'
import { inWarehouse } from './warehouse'

export const paginateReorderPoint = (
  options: Parameters<typeof orpcClient.wms.paginateReorderPoint>[0],
) =>
  queryOptions({
    queryKey: ['wms.reorderPoint', 'paginate', options],
    queryFn: async ({ client }) => {
      const reorderPoints = await orpcClient.wms.paginateReorderPoint(options)

      const products = await client.ensureQueryData(
        inProduct(reorderPoints.map((row) => row.productId).filter(nonEmpty)),
      )
      const warehouses = await client.ensureQueryData(
        inWarehouse(reorderPoints.map((row) => row.warehouseId).filter(nonEmpty)),
      )

      return reorderPoints.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
      }))
    },
    enabled: !!options,
  })

export const rangeReorderPoint = (
  options: Parameters<typeof orpcClient.wms.rangeReorderPoint>[0],
) =>
  queryOptions({
    queryKey: ['wms.reorderPoint', 'range', options],
    queryFn: () => orpcClient.wms.rangeReorderPoint(options),
    enabled: !!options,
  })

export const inReorderPoint = (options: Parameters<typeof orpcClient.wms.inReorderPoint>[0]) =>
  queryOptions({
    queryKey: ['wms.reorderPoint', 'in', options],
    queryFn: () => orpcClient.wms.inReorderPoint(options),
    enabled: !!options,
  })

export const createReorderPoint = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createReorderPoint>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createReorderPoint>[0]
>({
  mutationFn: (options) => orpcClient.wms.createReorderPoint(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Reorder Point: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.reorderPoint'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateReorderPoint = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateReorderPoint>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateReorderPoint>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateReorderPoint(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Reorder Point: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.reorderPoint'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteReorderPoint = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteReorderPoint>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteReorderPoint>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteReorderPoint(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Reorder Point has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.reorderPoint'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
