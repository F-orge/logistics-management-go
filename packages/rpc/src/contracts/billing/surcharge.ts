import { oc } from '@orpc/contract'
import { SurchargeRepository } from '@packages/db/repositories/billing'
import { SurchargeSchema } from '@packages/db/schemas/billing/surcharge'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginateSurchargeContract = oc
  .input(SurchargeRepository.schemas.paginateOptionSchema)
  .output(SurchargeSchema.array())

export const RangeSurchargeContract = oc
  .input(SurchargeRepository.schemas.rangeOptionSchema)
  .output(SurchargeSchema.array())

export const AnySurchargeContract = oc.input(z.uuid().array()).output(SurchargeSchema.array())

export const InsertSurchargeContract = oc
  .input(SurchargeRepository.schemas.InsertSchema)
  .output(SurchargeSchema)

export const InsertManySurchargeContract = oc
  .input(SurchargeRepository.schemas.InsertSchema.array())
  .output(SurchargeSchema.array())

export const UpdateSurchargeContract = oc
  .input(z.object({ id: z.uuid(), value: SurchargeRepository.schemas.UpdateSchema }))
  .output(SurchargeSchema)

export const RemoveSurchargeContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
