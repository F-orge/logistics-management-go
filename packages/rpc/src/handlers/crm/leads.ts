import { implement } from '@orpc/server'
import {
  LeadRepository,
  CampaignRepository,
  CompanyRepository,
  ContactRepository,
  OpportunityRepository,
} from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/leads'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

export const PaginateLead = implement(contracts.PaginateLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.paginate(input)

    const ownerIds = result.map((row) => row.ownerId).filter(nonEmpty)
    const campaignIds = result.map((row) => row.campaignId).filter(nonEmpty)
    const convertedCompanyIds = result.map((row) => row.convertedCompanyId).filter(nonEmpty)
    const convertedContactIds = result.map((row) => row.convertedContactId).filter(nonEmpty)
    const convertedOpportunityIds = result.map((row) => row.convertedOpportunityId).filter(nonEmpty)

    const ownerPromise = ownerRepo.any(ownerIds)
    const campaignPromise = campaignRepo.any(campaignIds)
    const companyPromise = companyRepo.any(convertedCompanyIds)
    const contactPromise = contactRepo.any(convertedContactIds)
    const opportunityPromise = opportunityRepo.any(convertedOpportunityIds)

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return result.map((row) => ({
      ...row,
      owner: owners.find((o) => o.id === row.ownerId)!,
      campaign: campaigns.find((c) => c.id === row.campaignId),
      convertedCompany: companies.find((c) => c.id === row.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === row.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === row.convertedOpportunityId),
    }))
  })

export const RangeLead = implement(contracts.RangeLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.range(input)

    const ownerIds = result.map((row) => row.ownerId).filter(nonEmpty)
    const campaignIds = result.map((row) => row.campaignId).filter(nonEmpty)
    const convertedCompanyIds = result.map((row) => row.convertedCompanyId).filter(nonEmpty)
    const convertedContactIds = result.map((row) => row.convertedContactId).filter(nonEmpty)
    const convertedOpportunityIds = result.map((row) => row.convertedOpportunityId).filter(nonEmpty)

    const ownerPromise = ownerRepo.any(ownerIds)
    const campaignPromise = campaignRepo.any(campaignIds)
    const companyPromise = companyRepo.any(convertedCompanyIds)
    const contactPromise = contactRepo.any(convertedContactIds)
    const opportunityPromise = opportunityRepo.any(convertedOpportunityIds)

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return result.map((row) => ({
      ...row,
      owner: owners.find((o) => o.id === row.ownerId)!,
      campaign: campaigns.find((c) => c.id === row.campaignId),
      convertedCompany: companies.find((c) => c.id === row.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === row.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === row.convertedOpportunityId),
    }))
  })

export const AnyLead = implement(contracts.AnyLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.any(input)

    const ownerIds = result.map((row) => row.ownerId).filter(nonEmpty)
    const campaignIds = result.map((row) => row.campaignId).filter(nonEmpty)
    const convertedCompanyIds = result.map((row) => row.convertedCompanyId).filter(nonEmpty)
    const convertedContactIds = result.map((row) => row.convertedContactId).filter(nonEmpty)
    const convertedOpportunityIds = result.map((row) => row.convertedOpportunityId).filter(nonEmpty)

    const ownerPromise = ownerRepo.any(ownerIds)
    const campaignPromise = campaignRepo.any(campaignIds)
    const companyPromise = companyRepo.any(convertedCompanyIds)
    const contactPromise = contactRepo.any(convertedContactIds)
    const opportunityPromise = opportunityRepo.any(convertedOpportunityIds)

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return result.map((row) => ({
      ...row,
      owner: owners.find((o) => o.id === row.ownerId)!,
      campaign: campaigns.find((c) => c.id === row.campaignId),
      convertedCompany: companies.find((c) => c.id === row.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === row.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === row.convertedOpportunityId),
    }))
  })

export const InsertLead = implement(contracts.InsertLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.insert(input)

    const ownerPromise = ownerRepo.any([result.ownerId])
    const campaignPromise = campaignRepo.any([result.campaignId || ''])
    const companyPromise = companyRepo.any([result.convertedCompanyId || ''])
    const contactPromise = contactRepo.any([result.convertedContactId || ''])
    const opportunityPromise = opportunityRepo.any([result.convertedOpportunityId || ''])

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return {
      ...result,
      owner: owners.find((o) => o.id === result.ownerId)!,
      campaign: campaigns.find((c) => c.id === result.campaignId),
      convertedCompany: companies.find((c) => c.id === result.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === result.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === result.convertedOpportunityId),
    }
  })

export const InsertManyLead = implement(contracts.InsertManyLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.insertMany(input)

    const ownerIds = result.map((row) => row.ownerId).filter(nonEmpty)
    const campaignIds = result.map((row) => row.campaignId).filter(nonEmpty)
    const convertedCompanyIds = result.map((row) => row.convertedCompanyId).filter(nonEmpty)
    const convertedContactIds = result.map((row) => row.convertedContactId).filter(nonEmpty)
    const convertedOpportunityIds = result.map((row) => row.convertedOpportunityId).filter(nonEmpty)

    const ownerPromise = ownerRepo.any(ownerIds)
    const campaignPromise = campaignRepo.any(campaignIds)
    const companyPromise = companyRepo.any(convertedCompanyIds)
    const contactPromise = contactRepo.any(convertedContactIds)
    const opportunityPromise = opportunityRepo.any(convertedOpportunityIds)

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return result.map((row) => ({
      ...row,
      owner: owners.find((o) => o.id === row.ownerId)!,
      campaign: campaigns.find((c) => c.id === row.campaignId),
      convertedCompany: companies.find((c) => c.id === row.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === row.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === row.convertedOpportunityId),
    }))
  })

export const UpdateLead = implement(contracts.UpdateLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await leadRepo.update(input.id, input.value)

    const ownerPromise = ownerRepo.any([result.ownerId])
    const campaignPromise = campaignRepo.any([result.campaignId || ''])
    const companyPromise = companyRepo.any([result.convertedCompanyId || ''])
    const contactPromise = contactRepo.any([result.convertedContactId || ''])
    const opportunityPromise = opportunityRepo.any([result.convertedOpportunityId || ''])

    const [owners, campaigns, companies, contacts, opportunities] = await Promise.all([
      ownerPromise,
      campaignPromise,
      companyPromise,
      contactPromise,
      opportunityPromise,
    ])

    return {
      ...result,
      owner: owners.find((o) => o.id === result.ownerId)!,
      campaign: campaigns.find((c) => c.id === result.campaignId),
      convertedCompany: companies.find((c) => c.id === result.convertedCompanyId),
      convertedContact: contacts.find((c) => c.id === result.convertedContactId),
      convertedOpportunity: opportunities.find((o) => o.id === result.convertedOpportunityId),
    }
  })

export const RemoveLead = implement(contracts.RemoveLeadContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const leadRepo = LeadRepository.fns(context.kysely)
    return await leadRepo.remove(input)
  })
