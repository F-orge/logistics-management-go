import { oc } from '@orpc/contract'
import { ReorderPointRepository } from '@packages/db/repositories/wms'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { ReorderPointSchema } from '@packages/db/schemas/wms/reorder_point'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ReorderPointSchema.extend({
  product: ProductSchema,
  warehouse: WarehouseSchema,
})

export const PaginateReorderPointContract = oc
  .input(ReorderPointRepository.schemas.paginateOptionSchema)
  .output(ReorderPointSchema.array())

export const RangeReorderPointContract = oc
  .input(ReorderPointRepository.schemas.rangeOptionSchema)
  .output(ReorderPointSchema.array())

export const AnyReorderPointContract = oc.input(z.uuid().array()).output(ReorderPointSchema.array())

export const InsertReorderPointContract = oc
  .input(ReorderPointRepository.schemas.InsertSchema)
  .output(ReorderPointSchema)

export const InsertManyReorderPointContract = oc
  .input(ReorderPointRepository.schemas.InsertSchema.array())
  .output(ReorderPointSchema.array())

export const UpdateReorderPointContract = oc
  .input(z.object({ id: z.uuid(), value: ReorderPointRepository.schemas.UpdateSchema }))
  .output(ReorderPointSchema)

export const RemoveReorderPointContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
