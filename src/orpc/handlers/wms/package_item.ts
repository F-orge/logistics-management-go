import { implement } from '@orpc/server'
import * as wmsContracts from '@/orpc/contracts/wms/package_item'
import { PackageItemRepository } from '@/repositories/wms/packageItems'
import type { HonoVariables } from '@/server'

export const paginatePackageItem = implement(wmsContracts.paginatePackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangePackageItem = implement(wmsContracts.rangePackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inPackageItem = implement(wmsContracts.inPackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.in(input).execute()
  })

export const createPackageItem = implement(wmsContracts.createPackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updatePackageItem = implement(wmsContracts.updatePackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deletePackageItem = implement(wmsContracts.deletePackageItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PackageItemRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
