import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types';
import { crmOpportunityProductInsertSchema } from './opportunity_products';

export const crmOpportunitySchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Opportunity name must be a string' })
      .min(1, { message: 'Opportunity name is required' })
      .max(255, { message: 'Opportunity name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Opportunity Name',
          description: 'The name of the opportunity.',
        }),
      ),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .min(1, { message: 'Owner ID is required' })
      .max(255, { message: 'Owner ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Owner ID',
          description: 'The ID of the user who owns this opportunity.',
        }),
      ),
    campaignId: z
      .uuid({ message: 'Invalid UUID format for campaign ID' })
      .check(
        fieldConfig({
          label: 'Campaign ID',
          description: 'The ID of the campaign this opportunity is related to.',
        }),
      )
      .optional()
      .nullable(),
    companyId: z
      .uuid({ message: 'Invalid UUID format for company ID' })
      .check(
        fieldConfig({
          label: 'Company ID',
          description: 'The ID of the company for this opportunity.',
        }),
      )
      .optional()
      .nullable(),
    contactId: z
      .uuid({ message: 'Invalid UUID format for contact ID' })
      .check(
        fieldConfig({
          label: 'Contact ID',
          description: 'The ID of the primary contact for this opportunity.',
        }),
      )
      .optional()
      .nullable(),
    dealValue: z.coerce
      .number({ message: 'Deal value must be a number' })
      .min(0, { message: 'Deal value must be at least 0' })
      .max(100000000, { message: 'Deal value must be at most 100,000,000' })
      .check(
        fieldConfig({
          label: 'Deal Value',
          description: 'The estimated value of the deal.',
        }),
      )
      .optional()
      .nullable(),
    expectedCloseDate: z
      .date({
        message: 'Invalid ISO datetime format for expected close date',
      })
      .check(
        fieldConfig({
          label: 'Expected Close Date',
          description: 'The date when the deal is expected to close.',
        }),
      )
      .optional()
      .nullable(),
    lostReason: z
      .string({ message: 'Lost reason must be a string' })
      .min(1, { message: 'Lost reason is required' })
      .max(1024, { message: 'Lost reason must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Lost Reason',
          description: 'The reason why the opportunity was lost.',
        }),
      )
      .optional()
      .nullable(),
    probability: z
      .number({ message: 'Probability must be a number' })
      .min(0, { message: 'Probability must be at least 0' })
      .max(100, { message: 'Probability must be at most 100' })
      .check(
        fieldConfig({
          label: 'Probability (%)',
          description: 'The probability of winning the deal (0-100).',
        }),
      )
      .optional()
      .nullable(),
    source: z
      .enum(CrmOpportunitySource, { message: 'Invalid opportunity source' })
      .check(
        fieldConfig({
          label: 'Source',
          description: 'The source of the opportunity.',
        }),
      )
      .optional()
      .nullable(),
    stage: z
      .enum(CrmOpportunityStage, { message: 'Invalid opportunity stage' })
      .check(
        fieldConfig({
          label: 'Stage',
          description: 'The current stage of the opportunity in the sales pipeline.',
        }),
      )
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
