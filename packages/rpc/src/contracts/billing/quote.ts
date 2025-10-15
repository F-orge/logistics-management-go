import { oc } from '@orpc/contract'
import { QuoteRepository } from '@packages/db/repositories/billing'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { QuoteSchema } from '@packages/db/schemas/billing/quote'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = QuoteSchema.extend({
  client: CompanySchema,
  createdByUser: UserSchema.optional(),
})

export const PaginateQuoteContract = oc
  .input(QuoteRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeQuoteContract = oc
  .input(QuoteRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyQuoteContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertQuoteContract = oc
  .input(QuoteRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyQuoteContract = oc
  .input(QuoteRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateQuoteContract = oc
  .input(z.object({ id: z.uuid(), value: QuoteRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveQuoteContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
