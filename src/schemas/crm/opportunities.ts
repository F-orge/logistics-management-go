import { z } from 'zod';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types';
import { crmOpportunityProductInsertSchema } from './opportunity_products';

export const crmOpportunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  campaignId: z.string().nullable(),
  companyId: z.string().nullable(),
  contactId: z.string().nullable(),
  dealValue: z.coerce.number().nullable(),
  expectedCloseDate: z
    .union([z.coerce.date(), z.string(), z.date()])
    .nullable(),
  lostReason: z.string().nullable(),
  probability: z.number().nullable(),
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
