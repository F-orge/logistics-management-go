import { z } from 'zod';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types';
import { crmOpportunityProductInsertSchema } from './opportunity_products';

export const crmOpportunitySchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Opportunity name must be a string' })
      .min(1, { message: 'Opportunity name is required' })
      .max(255, { message: 'Opportunity name must be at most 255 characters' }),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .min(1, { message: 'Owner ID is required' })
      .max(255, { message: 'Owner ID must be at most 255 characters' }),
    campaignId: z
      .uuid({ message: 'Invalid UUID format for campaign ID' })
      .optional()
      .nullable(),
    companyId: z
      .uuid({ message: 'Invalid UUID format for company ID' })
      .optional()
      .nullable(),
    contactId: z
      .uuid({ message: 'Invalid UUID format for contact ID' })
      .optional()
      .nullable(),
    dealValue: z.coerce
      .number({ message: 'Deal value must be a number' })
      .min(0, { message: 'Deal value must be at least 0' })
      .max(100000000, { message: 'Deal value must be at most 100,000,000' })
      .optional()
      .nullable(),
    expectedCloseDate: z
      .date({
        message: 'Invalid ISO datetime format for expected close date',
      })
      .optional()
      .nullable(),
    lostReason: z
      .string({ message: 'Lost reason must be a string' })
      .min(1, { message: 'Lost reason is required' })
      .max(1024, { message: 'Lost reason must be at most 1024 characters' })
      .optional()
      .nullable(),
    probability: z
      .number({ message: 'Probability must be a number' })
      .min(0, { message: 'Probability must be at least 0' })
      .max(100, { message: 'Probability must be at most 100' })
      .optional()
      .nullable(),
    source: z
      .enum(CrmOpportunitySource, { message: 'Invalid opportunity source' })
      .optional()
      .nullable(),
    stage: z
      .enum(CrmOpportunityStage, { message: 'Invalid opportunity stage' })
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict();

export type CrmOpportunity = z.infer<typeof crmOpportunitySchema>;

export const crmOpportunityInsertSchema = crmOpportunitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    products: z.array(crmOpportunityProductInsertSchema).optional().nullable(),
  });

export const crmOpportunityUpdateSchema = crmOpportunityInsertSchema.partial();
