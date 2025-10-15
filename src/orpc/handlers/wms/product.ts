import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/product'
import { ProductRepository } from '@/repositories/wms/products'
import type { HonoVariables } from '@/server'

export const paginateProduct = implement(wmsContracts.paginateProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeProduct = implement(wmsContracts.rangeProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inProduct = implement(wmsContracts.inProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.in(input).execute()
  })

export const createProduct = implement(wmsContracts.createProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateProduct = implement(wmsContracts.updateProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteProduct = implement(wmsContracts.deleteProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
