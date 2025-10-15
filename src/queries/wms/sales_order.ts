import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inCompany, inOpportunity } from '../crm'
import { paginateSalesOrderItem } from './sales_order_item'

export const paginateSalesOrder = (
  options: Parameters<typeof orpcClient.wms.paginateSalesOrder>[0],
) =>
  queryOptions({
    queryKey: ['wms.salesOrder', 'paginate', options],
    queryFn: async ({ client }) => {
      const salesOrders = await orpcClient.wms.paginateSalesOrder(options)

      const clients = await client.ensureQueryData(
        inCompany(salesOrders.map((row) => row.clientId)),
      )

      const opportunities = await client.ensureQueryData(
        inOpportunity(salesOrders.map((row) => row.crmOpportunityId).filter(nonEmpty)),
      )

      const items = await client.ensureQueryData(
        paginateSalesOrderItem({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'salesOrderId',
              operation: 'in',
              value: salesOrders.map((row) => row.id),
            },
          ],
        }),
      )

      return salesOrders.map((row) => ({
        ...row,
        client: clients.find((subRow) => subRow.id === row.clientId)!,
        opportunity: opportunities.find((subRow) => subRow.id === row.crmOpportunityId),
        items: items.filter((subRow) => subRow.salesOrderId === row.id),
      }))
    },
    enabled: !!options,
  })

export const rangeSalesOrder = (options: Parameters<typeof orpcClient.wms.rangeSalesOrder>[0]) =>
  queryOptions({
    queryKey: ['wms.salesOrder', 'range', options],
    queryFn: () => orpcClient.wms.rangeSalesOrder(options),
    enabled: !!options,
  })

export const inSalesOrder = (options: Parameters<typeof orpcClient.wms.inSalesOrder>[0]) =>
  queryOptions({
    queryKey: ['wms.salesOrder', 'in', options],
    queryFn: () => orpcClient.wms.inSalesOrder(options),
    enabled: !!options,
  })

export const createSalesOrder = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createSalesOrder>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createSalesOrder>[0]
>({
  mutationFn: (options) => orpcClient.wms.createSalesOrder(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.salesOrder'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateSalesOrder = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateSalesOrder>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateSalesOrder>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateSalesOrder(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.salesOrder'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteSalesOrder = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteSalesOrder>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteSalesOrder>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteSalesOrder(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Sales Order has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.salesOrder'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
