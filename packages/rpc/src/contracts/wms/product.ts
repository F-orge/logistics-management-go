import { oc } from '@orpc/contract'
import { ProductRepository } from '@packages/db/repositories/wms'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { SupplierSchema } from '@packages/db/schemas/wms/supplier'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ProductSchema.extend({
  client: CompanySchema.optional(),
  supplier: SupplierSchema.optional(),
})

export const PaginateProductContract = oc
  .input(ProductRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeProductContract = oc
  .input(ProductRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyProductContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertProductContract = oc
  .input(ProductRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyProductContract = oc
  .input(ProductRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateProductContract = oc
  .input(z.object({ id: z.uuid(), value: ProductRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveProductContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
