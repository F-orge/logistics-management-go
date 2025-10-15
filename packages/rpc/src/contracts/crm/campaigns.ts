import { oc } from '@orpc/contract'
import { CampaignRepository } from '@packages/db/repositories/crm'
import { CampaignSchema } from '@packages/db/schemas/crm/campaigns'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginateCampaignContract = oc
  .input(CampaignRepository.schemas.paginateOptionSchema)
  .output(CampaignSchema.array())

export const RangeCampaignContract = oc
  .input(CampaignRepository.schemas.rangeOptionSchema)
  .output(CampaignSchema.array())

export const AnyCampaignContract = oc.input(z.uuid().array()).output(CampaignSchema.array())

export const InsertCampaignContract = oc
  .input(CampaignRepository.schemas.InsertSchema)
  .output(CampaignSchema)

export const InsertManyCampaignContract = oc
  .input(CampaignRepository.schemas.InsertSchema.array())
  .output(CampaignSchema.array())

export const UpdateCampaignContract = oc
  .input(z.object({ id: z.uuid(), value: CampaignRepository.schemas.UpdateSchema }))
  .output(CampaignSchema)

export const RemoveCampaignContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
