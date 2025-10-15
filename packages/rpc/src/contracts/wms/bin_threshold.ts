import { oc } from '@orpc/contract'
import { BinThresholdRepository } from '@packages/db/repositories/wms'
import { BinThresholdSchema } from '@packages/db/schemas/wms/bin_threshold'
import { LocationSchema } from '@packages/db/schemas/wms/location'
import { ProductSchema } from '@packages/db/schemas/wms/product'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = BinThresholdSchema.extend({
  location: LocationSchema,
  product: ProductSchema,
})

export const PaginateBinThresholdContract = oc
  .input(BinThresholdRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeBinThresholdContract = oc
  .input(BinThresholdRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyBinThresholdContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertBinThresholdContract = oc
  .input(BinThresholdRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyBinThresholdContract = oc
  .input(BinThresholdRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateBinThresholdContract = oc
  .input(z.object({ id: z.uuid(), value: BinThresholdRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveBinThresholdContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
