import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inProduct } from './product'
import { inWarehouse } from './warehouse'

export const paginateStockTransfer = (
  options: Parameters<typeof orpcClient.wms.paginateStockTransfer>[0],
) =>
  queryOptions({
    queryKey: ['wms.stockTransfer', 'paginate', options],
    queryFn: async ({ client }) => {
      const stockTransfers = await orpcClient.wms.paginateStockTransfer(options)

      const warehouses = await client.ensureQueryData(
        inWarehouse(
          stockTransfers
            .flatMap((row) => [row.sourceWarehouseId, row.destinationWarehouseId])
            .filter(nonEmpty),
        ),
      )
      const products = await client.ensureQueryData(
        inProduct(stockTransfers.map((row) => row.productId).filter(nonEmpty)),
      )

      return stockTransfers.map((row) => ({
        ...row,
        sourceWarehouse: warehouses.find((subRow) => subRow.id === row.sourceWarehouseId),
        destinationWarehouse: warehouses.find((subRow) => subRow.id === row.destinationWarehouseId),
        product: products.find((subRow) => subRow.id === row.productId),
      }))
    },
    enabled: !!options,
  })

export const rangeStockTransfer = (
  options: Parameters<typeof orpcClient.wms.rangeStockTransfer>[0],
) =>
  queryOptions({
    queryKey: ['wms.stockTransfer', 'range', options],
    queryFn: () => orpcClient.wms.rangeStockTransfer(options),
    enabled: !!options,
  })

export const inStockTransfer = (options: Parameters<typeof orpcClient.wms.inStockTransfer>[0]) =>
  queryOptions({
    queryKey: ['wms.stockTransfer', 'in', options],
    queryFn: () => orpcClient.wms.inStockTransfer(options),
    enabled: !!options,
  })

export const createStockTransfer = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createStockTransfer>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createStockTransfer>[0]
>({
  mutationFn: (options) => orpcClient.wms.createStockTransfer(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Stock Transfer: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.stockTransfer'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateStockTransfer = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateStockTransfer>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateStockTransfer>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateStockTransfer(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Stock Transfer: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.stockTransfer'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteStockTransfer = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteStockTransfer>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteStockTransfer>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteStockTransfer(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Stock Transfer has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.stockTransfer'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
