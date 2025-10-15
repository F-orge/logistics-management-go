import { oc } from '@orpc/contract'
import { AccountingSyncLogRepository } from '@packages/db/repositories/billing'
import { AccountingSyncLogSchema } from '@packages/db/schemas/billing/accounting_sync_log'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginateAccountingSyncLogContract = oc
  .input(AccountingSyncLogRepository.schemas.paginateOptionSchema)
  .output(AccountingSyncLogSchema.array())

export const RangeAccountingSyncLogContract = oc
  .input(AccountingSyncLogRepository.schemas.rangeOptionSchema)
  .output(AccountingSyncLogSchema.array())

export const AnyAccountingSyncLogContract = oc
  .input(z.uuid().array())
  .output(AccountingSyncLogSchema.array())

export const InsertAccountingSyncLogContract = oc
  .input(AccountingSyncLogRepository.schemas.InsertSchema)
  .output(AccountingSyncLogSchema)

export const InsertManyAccountingSyncLogContract = oc
  .input(AccountingSyncLogRepository.schemas.InsertSchema.array())
  .output(AccountingSyncLogSchema.array())

export const UpdateAccountingSyncLogContract = oc
  .input(z.object({ id: z.uuid(), value: AccountingSyncLogRepository.schemas.UpdateSchema }))
  .output(AccountingSyncLogSchema)

export const RemoveAccountingSyncLogContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
