import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inUser } from '../auth/user'
import { inCampaign } from './campaigns'
import { inCompany } from './companies'
import { inContact } from './contacts'
import { inOpportunity } from './opportunities'

export const paginateLead = (options: Parameters<typeof orpcClient.crm.paginateLead>[0]) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: async ({ client }) => {
      const leads = await orpcClient.crm.paginateLead(options)

      const campaignPromises = client.ensureQueryData(
        inCampaign(leads.map((row) => row.campaignId).filter(nonEmpty)),
      )

      const ownerPromises = client.ensureQueryData(
        inUser(leads.map((row) => row.ownerId).filter(nonEmpty)),
      )

      const convertedCompanyPromises = client.ensureQueryData(
        inCompany(leads.map((row) => row.convertedCompanyId).filter(nonEmpty)),
      )

      const convertedContactPromises = client.ensureQueryData(
        inContact(leads.map((row) => row.convertedContactId).filter(nonEmpty)),
      )

      const convertedOpportunityPromises = client.ensureQueryData(
        inOpportunity(leads.map((row) => row.convertedOpportunityId).filter(nonEmpty)),
      )

      const [campaigns, owners, convertedCompanies, convertedContacts, convertedOpportunities] =
        await Promise.all([
          campaignPromises,
          ownerPromises,
          convertedCompanyPromises,
          convertedContactPromises,
          convertedOpportunityPromises,
        ])

      return leads.map((row) => ({
        ...row,
        campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
        owner: owners.find((subRow) => subRow.id === row.ownerId)!,
        convertedCompany: convertedCompanies.find((subRow) => subRow.id === row.convertedCompanyId),
        convertedContact: convertedContacts.find((subRow) => subRow.id === row.convertedContactId),
        convertedOpportunity: convertedOpportunities.find(
          (subRow) => subRow.id === row.convertedOpportunityId,
        ),
      }))
    },
    enabled: !!options,
  })

export const rangeLead = (options: Parameters<typeof orpcClient.crm.rangeLead>[0]) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: () => orpcClient.crm.rangeLead(options),
    enabled: !!options,
  })

export const inLead = (options: Parameters<typeof orpcClient.crm.inLead>[0]) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: () => (options.length >= 1 ? orpcClient.crm.inLead(options) : []),
    enabled: !!options,
  })

export const createLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.createLead(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Lead: ${data.name} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateLead(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Lead: ${data.name} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteLead(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    })
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
