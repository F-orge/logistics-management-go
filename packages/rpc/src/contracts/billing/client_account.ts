import { oc } from '@orpc/contract'
import { ClientAccountRepository } from '@packages/db/repositories/billing'
import { ClientAccountSchema } from '@packages/db/schemas/billing/client_account'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ClientAccountSchema.extend({
  client: CompanySchema,
})

export const PaginateClientAccountContract = oc
  .input(ClientAccountRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeClientAccountContract = oc
  .input(ClientAccountRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyClientAccountContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertClientAccountContract = oc
  .input(ClientAccountRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyClientAccountContract = oc
  .input(ClientAccountRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateClientAccountContract = oc
  .input(z.object({ id: z.uuid(), value: ClientAccountRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveClientAccountContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
