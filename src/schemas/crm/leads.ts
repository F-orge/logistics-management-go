import { z } from 'zod';
import { CrmLeadSource, CrmLeadStatus } from '@/db/types';
import { crmOpportunityInsertSchema } from './opportunities';

export const crmLeadSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Lead name is required' })
    .max(255, { error: 'Lead name must be at most 255 characters' }),
  email: z
    .email()
    .min(1, { error: 'Email is required' })
    .max(255, { error: 'Email must be at most 255 characters' }),
  ownerId: z
    .string()
    .min(1, { error: 'Owner ID is required' })
    .max(255, { error: 'Owner ID must be at most 255 characters' }),
  campaignId: z.uuid().nullable(),
  convertedAt: z.iso.datetime().nullable(),
  convertedCompanyId: z.uuid().nullable(),
  convertedContactId: z.uuid().nullable(),
  convertedOpportunityId: z.uuid().nullable(),
  leadScore: z
    .number()
    .min(0, { error: 'Lead score must be at least 0' })
    .max(100, { error: 'Lead score must be at most 100' })
    .nullable(),
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
