import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/supplier'
import { SupplierRepository } from '@/repositories/wms/suppliers'
import type { HonoVariables } from '@/server'

export const paginateSupplier = implement(wmsContracts.paginateSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeSupplier = implement(wmsContracts.rangeSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inSupplier = implement(wmsContracts.inSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.in(input).execute()
  })

export const createSupplier = implement(wmsContracts.createSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateSupplier = implement(wmsContracts.updateSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteSupplier = implement(wmsContracts.deleteSupplierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SupplierRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
