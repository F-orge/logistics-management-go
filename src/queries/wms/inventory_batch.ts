import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inProduct } from './product'

export const paginateInventoryBatch = (
  options: Parameters<typeof orpcClient.wms.paginateInventoryBatch>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryBatch', 'paginate', options],
    queryFn: async ({ client }) => {
      const inventoryBatches = await orpcClient.wms.paginateInventoryBatch(options)

      const products = await client.ensureQueryData(
        inProduct(inventoryBatches.map((row) => row.productId).filter(nonEmpty)),
      )

      return inventoryBatches.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
      }))
    },
    enabled: !!options,
  })

export const rangeInventoryBatch = (
  options: Parameters<typeof orpcClient.wms.rangeInventoryBatch>[0],
) =>
  queryOptions({
    queryKey: ['wms.inventoryBatch', 'range', options],
    queryFn: () => orpcClient.wms.rangeInventoryBatch(options),
    enabled: !!options,
  })

export const inInventoryBatch = (options: Parameters<typeof orpcClient.wms.inInventoryBatch>[0]) =>
  queryOptions({
    queryKey: ['wms.inventoryBatch', 'in', options],
    queryFn: () => orpcClient.wms.inInventoryBatch(options),
    enabled: !!options,
  })

export const createInventoryBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createInventoryBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createInventoryBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.createInventoryBatch(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Batch: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryBatch'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateInventoryBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateInventoryBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateInventoryBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateInventoryBatch(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Batch: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryBatch'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteInventoryBatch = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteInventoryBatch>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteInventoryBatch>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteInventoryBatch(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inventory Batch has been deleted successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inventoryBatch'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
