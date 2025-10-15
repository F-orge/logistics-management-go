import { oc } from '@orpc/contract'
import { CompanyRepository } from '@packages/db/repositories/crm'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = CompanySchema.extend({
  owner: UserSchema.optional(),
})

export const PaginateCompanyContract = oc
  .input(CompanyRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeCompanyContract = oc
  .input(CompanyRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyCompanyContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertCompanyContract = oc
  .input(CompanyRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyCompanyContract = oc
  .input(CompanyRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateCompanyContract = oc
  .input(z.object({ id: z.uuid(), value: CompanyRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveCompanyContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
