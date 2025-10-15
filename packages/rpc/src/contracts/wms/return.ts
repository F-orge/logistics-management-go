import { oc } from '@orpc/contract'
import { ReturnItemRepository, ReturnRepository } from '@packages/db/repositories/wms'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { ReturnSchema } from '@packages/db/schemas/wms/return'
import { ReturnItemSchema } from '@packages/db/schemas/wms/return_item'
import { SalesOrderSchema } from '@packages/db/schemas/wms/sales_order'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ReturnSchema.extend({
  client: CompanySchema,
  salesOrder: SalesOrderSchema.optional(),
  items: ReturnItemSchema.extend({ product: ProductSchema }).array(),
})

export const PaginateReturnContract = oc
  .input(ReturnRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeReturnContract = oc
  .input(ReturnRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyReturnContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertReturnContract = oc
  .input(
    ReturnRepository.schemas.InsertSchema.extend({
      items: ReturnItemRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyReturnContract = oc
  .input(
    ReturnRepository.schemas.InsertSchema.extend({
      items: ReturnItemRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdateReturnContract = oc
  .input(z.object({ id: z.uuid(), value: ReturnRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveReturnContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertReturnItemContract = oc
  .input(ReturnItemRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyReturnItemContract = oc
  .input(ReturnItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateReturnItemContract = oc
  .input(z.object({ id: z.uuid(), value: ReturnItemRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveReturnItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
