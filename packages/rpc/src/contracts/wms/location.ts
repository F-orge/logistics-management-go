import { oc } from '@orpc/contract'
import { LocationRepository } from '@packages/db/repositories/wms'
import { LocationSchema } from '@packages/db/schemas/wms/location'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = LocationSchema.extend({
  warehouse: WarehouseSchema,
  parentLocation: LocationSchema,
})

export const PaginateLocationContract = oc
  .input(LocationRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeLocationContract = oc
  .input(LocationRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyLocationContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertLocationContract = oc
  .input(LocationRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyLocationContract = oc
  .input(LocationRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateLocationContract = oc
  .input(z.object({ id: z.uuid(), value: LocationRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveLocationContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
