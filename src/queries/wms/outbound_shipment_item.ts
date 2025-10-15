import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inInventoryBatch } from './inventory_batch'
import { inOutboundShipment } from './outbound_shipment'
import { inProduct } from './product'
import { inSalesOrderItem } from './sales_order_item'

export const paginateOutboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.paginateOutboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipmentItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const outboundShipmentItems = await orpcClient.wms.paginateOutboundShipmentItem(options)

      const products = await client.ensureQueryData(
        inProduct(outboundShipmentItems.map((row) => row.productId).filter(nonEmpty)),
      )
      const inventoryBatches = await client.ensureQueryData(
        inInventoryBatch(outboundShipmentItems.map((row) => row.batchId).filter(nonEmpty)),
      )
      const salesOrderItems = await client.ensureQueryData(
        inSalesOrderItem(outboundShipmentItems.map((row) => row.salesOrderItemId).filter(nonEmpty)),
      )

      return outboundShipmentItems.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
        batch: inventoryBatches.find((subRow) => subRow.id === row.batchId),
        salesOrderItem: salesOrderItems.find((subRow) => subRow.id === row.salesOrderItemId),
      }))
    },
    enabled: !!options,
  })

export const rangeOutboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.rangeOutboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipmentItem', 'range', options],
    queryFn: () => orpcClient.wms.rangeOutboundShipmentItem(options),
    enabled: !!options,
  })

export const inOutboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.inOutboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipmentItem', 'in', options],
    queryFn: () => orpcClient.wms.inOutboundShipmentItem(options),
    enabled: !!options,
  })

export const createOutboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createOutboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createOutboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createOutboundShipmentItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment Item: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateOutboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateOutboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateOutboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateOutboundShipmentItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment Item: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteOutboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteOutboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteOutboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteOutboundShipmentItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment Item has been deleted successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
