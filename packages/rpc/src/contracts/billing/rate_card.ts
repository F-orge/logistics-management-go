import { oc } from '@orpc/contract'
import { RateCardRepository, RateRuleRepository } from '@packages/db/repositories/billing'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { RateCardSchema } from '@packages/db/schemas/billing/rate_card'
import { RateRuleSchema } from '@packages/db/schemas/billing/rate_rule'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = RateCardSchema.extend({
  createdByUser: UserSchema.optional(),
  rules: RateRuleSchema.array(),
})

export const PaginateRateCardContract = oc
  .input(RateCardRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeRateCardContract = oc
  .input(RateCardRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyRateCardContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertRateCardContract = oc
  .input(
    RateCardRepository.schemas.InsertSchema.extend({
      rules: RateRuleRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyRateCardContract = oc
  .input(
    RateCardRepository.schemas.InsertSchema.extend({
      rules: RateRuleRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdateRateCardContract = oc
  .input(z.object({ id: z.uuid(), value: RateCardRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveRateCardContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertRateRuleContract = oc
  .input(RateRuleRepository.schemas.InsertSchema)
  .output(RateRuleSchema)

export const InsertManyRateRuleContract = oc
  .input(RateRuleRepository.schemas.InsertSchema.array())
  .output(RateRuleSchema.array())

export const UpdateRateRuleContract = oc
  .input(z.object({ id: z.uuid(), value: RateRuleRepository.schemas.UpdateSchema }))
  .output(RateRuleSchema)

export const RemoveRateRuleContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
