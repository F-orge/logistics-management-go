import { oc } from '@orpc/contract'
import { InteractionRepository } from '@packages/db/repositories/crm'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { CaseSchema } from '@packages/db/schemas/crm/cases'
import { ContactSchema } from '@packages/db/schemas/crm/contacts'
import { InteractionSchema } from '@packages/db/schemas/crm/interactions'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = InteractionSchema.extend({
  contact: ContactSchema,
  case: CaseSchema.optional(),
  user: UserSchema,
})

export const PaginateInteractionContract = oc
  .input(InteractionRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeInteractionContract = oc
  .input(InteractionRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyInteractionContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertInteractionContract = oc
  .input(InteractionRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyInteractionContract = oc
  .input(InteractionRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateInteractionContract = oc
  .input(z.object({ id: z.uuid(), value: InteractionRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveInteractionContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
