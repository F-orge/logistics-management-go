import { oc } from '@orpc/contract'
import { LeadRepository } from '@packages/db/repositories/crm'
import { UserSchema } from '@packages/db/schemas/auth/user'
import { CampaignSchema } from '@packages/db/schemas/crm/campaigns'
import { CompanySchema } from '@packages/db/schemas/crm/companies'
import { ContactSchema } from '@packages/db/schemas/crm/contacts'
import { LeadSchema } from '@packages/db/schemas/crm/leads'
import { OpportunitySchema } from '@packages/db/schemas/crm/opportunities'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = LeadSchema.extend({
  owner: UserSchema,
  campaign: CampaignSchema.optional(),
  convertedCompany: CompanySchema.optional(),
  convertedContact: ContactSchema.optional(),
  convertedOpportunity: OpportunitySchema.optional(),
})

export const PaginateLeadContract = oc
  .input(LeadRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeLeadContract = oc
  .input(LeadRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyLeadContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertLeadContract = oc.input(LeadRepository.schemas.InsertSchema).output(OutputSchema)

export const InsertManyLeadContract = oc
  .input(LeadRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateLeadContract = oc
  .input(z.object({ id: z.uuid(), value: LeadRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveLeadContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
