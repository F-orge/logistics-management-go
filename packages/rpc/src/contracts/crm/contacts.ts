import { oc } from '@orpc/contract'
import { ContactRepository } from '@packages/db/repositories/crm'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { ContactSchema } from '@packages/db/schemas/crm/contacts'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ContactSchema.extend({
  company: CompanySchema.optional(),
  owner: UserSchema,
})

export const PaginateContactContract = oc
  .input(ContactRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeContactContract = oc
  .input(ContactRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyContactContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertContactContract = oc
  .input(ContactRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyContactContract = oc
  .input(ContactRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateContactContract = oc
  .input(z.object({ id: z.uuid(), value: ContactRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveContactContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
