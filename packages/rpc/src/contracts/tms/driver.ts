import { oc } from '@orpc/contract'
import { DriverRepository, DriverScheduleRepository } from '@packages/db/repositories/tms'
import { DriverSchema } from '@packages/db/schemas/tms/driver'
import { DriverScheduleSchema } from '@packages/db/schemas/tms/driver_schedule'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = DriverSchema.extend({
  schedules: DriverScheduleSchema.array(),
})

export const PaginateDriverContract = oc
  .input(DriverRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeDriverContract = oc
  .input(DriverRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyDriverContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertDriverContract = oc
  .input(DriverRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyDriverContract = oc
  .input(DriverRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateDriverContract = oc
  .input(z.object({ id: z.uuid(), value: DriverRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveDriverContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertDriverScheduleContract = oc
  .input(DriverScheduleRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyDriverScheduleContract = oc
  .input(DriverScheduleRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateDriverScheduleContract = oc
  .input(z.object({ id: z.uuid(), value: DriverScheduleRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveDriverScheduleContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
