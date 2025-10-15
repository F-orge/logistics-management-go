import { oc } from '@orpc/contract'
import { WarehouseRepository } from '@packages/db/repositories/wms'
import { WarehouseSchema } from '@packages/db/schemas/wms/warehouse'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginateWarehouseContract = oc
  .input(WarehouseRepository.schemas.paginateOptionSchema)
  .output(WarehouseSchema.array())

export const RangeWarehouseContract = oc
  .input(WarehouseRepository.schemas.rangeOptionSchema)
  .output(WarehouseSchema.array())

export const AnyWarehouseContract = oc.input(z.uuid().array()).output(WarehouseSchema.array())

export const InsertWarehouseContract = oc
  .input(WarehouseRepository.schemas.InsertSchema)
  .output(WarehouseSchema)

export const InsertManyWarehouseContract = oc
  .input(WarehouseRepository.schemas.InsertSchema.array())
  .output(WarehouseSchema.array())

export const UpdateWarehouseContract = oc
  .input(z.object({ id: z.uuid(), value: WarehouseRepository.schemas.UpdateSchema }))
  .output(WarehouseSchema)

export const RemoveWarehouseContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
