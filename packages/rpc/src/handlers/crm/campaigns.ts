import { implement } from '@orpc/server'
import { CampaignRepository } from '@packages/db/repositories/crm'
import * as contracts from '@/contracts/crm/campaigns'
import type { ORPCContext } from '@/index'

export const PaginateCampaign = implement(contracts.PaginateCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.paginate(input)
  })

export const RangeCampaign = implement(contracts.RangeCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.range(input)
  })

export const AnyCampaign = implement(contracts.AnyCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.any(input)
  })

export const InsertCampaign = implement(contracts.InsertCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.insert(input)
  })

export const InsertManyCampaign = implement(contracts.InsertManyCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.insertMany(input)
  })

export const UpdateCampaign = implement(contracts.UpdateCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.update(input.id, input.value)
  })

export const RemoveCampaign = implement(contracts.RemoveCampaignContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const campaignRepo = CampaignRepository.fns(context.kysely)

    return await campaignRepo.remove(input)
  })
