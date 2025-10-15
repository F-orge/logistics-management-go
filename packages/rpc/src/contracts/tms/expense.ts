import { oc } from '@orpc/contract'
import { ExpenseRepository } from '@packages/db/repositories/tms'
import { DriverSchema } from '@packages/db/schemas/tms/driver'
import { ExpenseSchema } from '@packages/db/schemas/tms/expense'
import { TripSchema } from '@packages/db/schemas/tms/trip'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ExpenseSchema.extend({
  trip: TripSchema.optional(),
  driver: DriverSchema.optional(),
})

export const PaginateExpenseContract = oc
  .input(ExpenseRepository.schemas.paginateOptionSchema)
  .output(ExpenseSchema.array())

export const RangeExpenseContract = oc
  .input(ExpenseRepository.schemas.rangeOptionSchema)
  .output(ExpenseSchema.array())

export const AnyExpenseContract = oc.input(z.uuid().array()).output(ExpenseSchema.array())

export const InsertExpenseContract = oc
  .input(ExpenseRepository.schemas.InsertSchema)
  .output(ExpenseSchema)

export const InsertManyExpenseContract = oc
  .input(ExpenseRepository.schemas.InsertSchema.array())
  .output(ExpenseSchema.array())

export const UpdateExpenseContract = oc
  .input(z.object({ id: z.uuid(), value: ExpenseRepository.schemas.UpdateSchema }))
  .output(ExpenseSchema)

export const RemoveExpenseContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
