import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inInboundShipment } from './inbound_shipment'
import { inProduct } from './product'

export const paginateInboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.paginateInboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipmentItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const inboundShipmentItems = await orpcClient.wms.paginateInboundShipmentItem(options)

      const products = await client.ensureQueryData(
        inProduct(inboundShipmentItems.map((row) => row.productId).filter(nonEmpty)),
      )

      return inboundShipmentItems.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId),
      }))
    },
    enabled: !!options,
  })

export const rangeInboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.rangeInboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipmentItem', 'range', options],
    queryFn: () => orpcClient.wms.rangeInboundShipmentItem(options),
    enabled: !!options,
  })

export const inInboundShipmentItem = (
  options: Parameters<typeof orpcClient.wms.inInboundShipmentItem>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipmentItem', 'in', options],
    queryFn: () => orpcClient.wms.inInboundShipmentItem(options),
    enabled: !!options,
  })

export const createInboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createInboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createInboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.createInboundShipmentItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment Item: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateInboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateInboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateInboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateInboundShipmentItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment Item: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteInboundShipmentItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteInboundShipmentItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteInboundShipmentItem>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteInboundShipmentItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment Item has been deleted successfully`,
    })
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipmentItem'],
    })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
