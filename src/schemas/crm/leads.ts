import { z } from 'zod';
import { CrmLeadSource, CrmLeadStatus } from '@/db/types';
import { crmOpportunityInsertSchema } from './opportunities';

export const crmLeadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  ownerId: z.string(),
  campaignId: z.string().nullable(),
  convertedAt: z.iso.datetime().nullable(),
  convertedCompanyId: z.string().nullable(),
  convertedContactId: z.string().nullable(),
  convertedOpportunityId: z.string().nullable(),
  leadScore: z.number().nullable(),
  leadSource: z.enum(CrmLeadSource).nullable(),
  status: z.enum(CrmLeadStatus).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmLead = z.infer<typeof crmLeadSchema>;

export const crmLeadInsertSchema = crmLeadSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    opportunities: z.array(crmOpportunityInsertSchema).optional(),
  });

export const crmLeadUpdateSchema = crmLeadInsertSchema.partial();
