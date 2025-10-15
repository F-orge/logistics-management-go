import { oc } from '@orpc/contract'
import { DisputeRepository } from '@packages/db/repositories/billing'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { DisputeSchema } from '@packages/db/schemas/billing/dispute'
import { InvoiceLineItemSchema } from '@packages/db/schemas/billing/invoice_line_item'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = DisputeSchema.extend({
  client: CompanySchema,
  resolvedByUser: UserSchema.optional(),
  lineItem: InvoiceLineItemSchema,
})

export const PaginateDisputeContract = oc
  .input(DisputeRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeDisputeContract = oc
  .input(DisputeRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyDisputeContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertDisputeContract = oc
  .input(DisputeRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyDisputeContract = oc
  .input(DisputeRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateDisputeContract = oc
  .input(z.object({ id: z.uuid(), value: DisputeRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveDisputeContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
