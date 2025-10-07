import { z } from 'zod';
import { CrmLeadSource, CrmLeadStatus } from '@/db/types';
import { crmOpportunityInsertSchema } from './opportunities';

export const crmLeadSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Lead name must be a string' })
    .min(1, { message: 'Lead name is required' })
    .max(255, { message: 'Lead name must be at most 255 characters' }),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email must be at most 255 characters' }),
  ownerId: z
    .string({ message: 'Owner ID must be a string' })
    .min(1, { message: 'Owner ID is required' })
    .max(255, { message: 'Owner ID must be at most 255 characters' }),
  campaignId: z
    .uuid({ message: 'Invalid UUID format for campaign ID' })
    .optional(),
  convertedAt: z
    .date({ message: 'Invalid ISO datetime format for conversion date' })
    .optional(),
  convertedCompanyId: z
    .string().uuid({ message: 'Invalid UUID format for converted company ID' })
    .nullable()
    .optional(),
  convertedContactId: z
    .string().uuid({ message: 'Invalid UUID format for converted contact ID' })
    .nullable()
    .optional(),
  convertedOpportunityId: z
    .string().uuid({ message: 'Invalid UUID format for converted opportunity ID' })
    .nullable()
    .optional(),
  leadScore: z
    .number({ message: 'Lead score must be a number' })
    .int({ message: 'Lead score must be an integer' })
    .min(0, { message: 'Lead score must be at least 0' })
    .max(100, { message: 'Lead score must be at most 100' })
    .optional(),
  leadSource: z
    .enum(CrmLeadSource, { message: 'Invalid lead source' })
    .optional(),
  status: z.enum(CrmLeadStatus, { message: 'Invalid lead status' }).optional(),
  createdAt: z
    .date({ message: 'Invalid ISO datetime format for creation date' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid ISO datetime format for update date' })
    .optional(),
}).strict();

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
