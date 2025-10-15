import { oc } from '@orpc/contract'
import { PackageItemRepository, PackageRepository } from '@packages/db/repositories/wms'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { OpportunitySchema } from '@packages/db/schemas/crm/opportunities'
import { PackageSchema } from '@packages/db/schemas/wms/package'
import { PackageItemSchema } from '@packages/db/schemas/wms/package_item'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { SalesOrderSchema } from '@packages/db/schemas/wms/sales_order'
import { SupplierSchema } from '@packages/db/schemas/wms/supplier'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = PackageSchema.extend({
  salesOrder: SalesOrderSchema.extend({
    client: CompanySchema,
    opportunity: OpportunitySchema.optional(),
  }),
  warehouse: WarehouseSchema,
  packedByUser: UserSchema.optional(),
  items: PackageItemSchema.extend({
    product: ProductSchema.extend({
      supplier: SupplierSchema.optional(),
    }),
  }).array(),
})

export const PaginatePackageContract = oc
  .input(PackageRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangePackageContract = oc
  .input(PackageRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyPackageContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertPackageContract = oc
  .input(
    PackageRepository.schemas.InsertSchema.extend({
      items: PackageItemRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyPackageContract = oc
  .input(
    PackageRepository.schemas.InsertSchema.extend({
      items: PackageItemRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdatePackageContract = oc
  .input(z.object({ id: z.uuid(), value: PackageRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemovePackageContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertPackageItemContract = oc
  .input(PackageItemRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyPackageItemContract = oc
  .input(PackageItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdatePackageItemContract = oc
  .input(z.object({ id: z.uuid(), value: PackageItemRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemovePackageItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
