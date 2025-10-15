import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/sales_order_item'
import { SalesOrderItemRepository } from '@/repositories/wms/salesOrderItems'
import type { HonoVariables } from '@/server'

export const paginateSalesOrderItem = implement(wmsContracts.paginateSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeSalesOrderItem = implement(wmsContracts.rangeSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inSalesOrderItem = implement(wmsContracts.inSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.in(input).execute()
  })

export const createSalesOrderItem = implement(wmsContracts.createSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateSalesOrderItem = implement(wmsContracts.updateSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteSalesOrderItem = implement(wmsContracts.deleteSalesOrderItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderItemRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
