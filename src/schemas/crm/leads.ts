import { fieldConfig } from '@autoform/zod'
import { z } from 'zod'
import { CrmLeadSource, CrmLeadStatus } from '@/db/types'
import { crmOpportunityInsertSchema } from './opportunities'

export const crmLeadSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Lead name must be a string' })
      .min(1, { message: 'Lead name is required' })
      .max(255, { message: 'Lead name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Lead Name',
          description: 'The full name of the lead.',
        }),
      ),
    email: z
      .string({ message: 'Email must be a string' })
      .email({ message: 'Invalid email format' })
      .max(255, { message: 'Email must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Email',
          description: 'The email address of the lead.',
        }),
      ),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .min(1, { message: 'Owner ID is required' })
      .max(255, { message: 'Owner ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Owner ID',
          description: 'The ID of the user who owns this lead.',
        }),
      ),
    campaignId: z
      .uuid({ message: 'Invalid UUID format for campaign ID' })
      .check(
        fieldConfig({
          label: 'Campaign ID',
          description: 'The ID of the campaign this lead originated from.',
        }),
      )
      .optional()
      .nullable(),
    convertedAt: z
      .date({ message: 'Invalid ISO datetime format for conversion date' })
      .check(
        fieldConfig({
          label: 'Converted At',
          description: 'The date and time the lead was converted.',
        }),
      )
      .optional()
      .nullable(),
    convertedCompanyId: z
      .uuid({ message: 'Invalid UUID format for converted company ID' })
      .check(
        fieldConfig({
          label: 'Converted Company ID',
          description: 'The ID of the company created from this lead.',
        }),
      )
      .nullable()
      .optional(),
    convertedContactId: z
      .uuid({ message: 'Invalid UUID format for converted contact ID' })
      .check(
        fieldConfig({
          label: 'Converted Contact ID',
          description: 'The ID of the contact created from this lead.',
        }),
      )
      .nullable()
      .optional(),
    convertedOpportunityId: z
      .uuid({ message: 'Invalid UUID format for converted opportunity ID' })
      .check(
        fieldConfig({
          label: 'Converted Opportunity ID',
          description: 'The ID of the opportunity created from this lead.',
        }),
      )
      .nullable()
      .optional(),
    leadScore: z
      .number({ message: 'Lead score must be a number' })
      .int({ message: 'Lead score must be an integer' })
      .min(0, { message: 'Lead score must be at least 0' })
      .max(100, { message: 'Lead score must be at most 100' })
      .check(
        fieldConfig({
          label: 'Lead Score',
          description: 'A score indicating the quality of the lead.',
        }),
      )
      .optional()
      .nullable(),
    leadSource: z
      .enum(CrmLeadSource, { message: 'Invalid lead source' })
      .check(
        fieldConfig({
          label: 'Lead Source',
          description: 'The source from which the lead was generated.',
        }),
      )
      .optional()
      .nullable(),
    status: z
      .enum(CrmLeadStatus, { message: 'Invalid lead status' })
      .check(
        fieldConfig({
          label: 'Status',
          description: 'The current status of the lead.',
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
  .strict()

export type CrmLead = z.infer<typeof crmLeadSchema>

export const crmLeadInsertSchema = crmLeadSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    opportunities: z.array(crmOpportunityInsertSchema).optional().nullable(),
  })

export const crmLeadUpdateSchema = crmLeadInsertSchema.partial()
