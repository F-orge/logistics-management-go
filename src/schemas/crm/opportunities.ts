import { z } from 'zod';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types';
import { crmOpportunityProductInsertSchema } from './opportunity_products';

export const crmOpportunitySchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Opportunity name is required' })
    .max(255, { error: 'Opportunity name must be at most 255 characters' }),
  ownerId: z
    .string()
    .min(1, { error: 'Owner ID is required' })
    .max(255, { error: 'Owner ID must be at most 255 characters' }),
  campaignId: z.uuid().nullable(),
  companyId: z.uuid().nullable(),
  contactId: z.uuid().nullable(),
  dealValue: z.coerce
    .number()
    .min(0, { error: 'Deal value must be at least 0' })
    .max(100000000, { error: 'Deal value must be at most 100,000,000' })
    .nullable(),
  expectedCloseDate: z.iso.datetime().nullable(),
  lostReason: z
    .string()
    .min(1, { error: 'Lost reason is required' })
    .max(1024, { error: 'Lost reason must be at most 1024 characters' })
    .nullable(),
  probability: z
    .number()
    .min(0, { error: 'Probability must be at least 0' })
    .max(100, { error: 'Probability must be at most 100' })
    .nullable(),
  source: z.enum(CrmOpportunitySource).nullable(),
  stage: z.enum(CrmOpportunityStage).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmOpportunity = z.infer<typeof crmOpportunitySchema>;

export const crmOpportunityInsertSchema = crmOpportunitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    products: z.array(crmOpportunityProductInsertSchema).optional(),
  });

export const crmOpportunityUpdateSchema = crmOpportunityInsertSchema.partial();
