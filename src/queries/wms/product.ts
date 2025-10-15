import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inSupplier } from './supplier'

export const paginateProduct = (options: Parameters<typeof orpcClient.wms.paginateProduct>[0]) =>
  queryOptions({
    queryKey: ['wms.product', 'paginate', options],
    queryFn: async ({ client }) => {
      const products = await orpcClient.wms.paginateProduct(options)

      const suppliers = await client.ensureQueryData(
        inSupplier(products.map((row) => row.supplierId).filter(nonEmpty)),
      )

      return products.map((row) => ({
        ...row,
        supplier: suppliers.find((subRow) => subRow.id === row.supplierId),
      }))
    },
    enabled: !!options,
  })

export const rangeProduct = (options: Parameters<typeof orpcClient.wms.rangeProduct>[0]) =>
  queryOptions({
    queryKey: ['wms.product', 'range', options],
    queryFn: () => orpcClient.wms.rangeProduct(options),
    enabled: !!options,
  })

export const inProduct = (options: Parameters<typeof orpcClient.wms.inProduct>[0]) =>
  queryOptions({
    queryKey: ['wms.product', 'in', options],
    queryFn: () => (options.length >= 1 ? orpcClient.wms.inProduct(options) : []),
    enabled: !!options,
  })

export const createProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createProduct>[0]
>({
  mutationFn: (options) => orpcClient.wms.createProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Product: ${data.name} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.product'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateProduct>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Product: ${data.name} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.product'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteProduct>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteProduct(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Product has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['wms.product'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
