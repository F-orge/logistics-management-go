import { z } from 'zod';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types';

export const crmCaseSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  caseNumber: z
    .string({ message: 'Case number must be a string' })
    .min(1, { message: 'Case number is required' })
    .max(127, { message: 'Case number must be at most 127 characters' }),
  contactId: z.uuid({ message: 'Invalid UUID format for contact ID' }).nullable(),
  description: z
    .string({ message: 'Description must be a string' })
    .min(1, { message: 'Description is required' })
    .max(1024, { message: 'Description must be at most 1024 characters' })
    .nullable(),
  ownerId: z
    .string({ message: 'Owner ID must be a string' })
    .min(1, { message: 'Owner ID is required' })
    .max(255, { message: 'Owner ID must be at most 255 characters' }),
  priority: z.enum(CrmCasePriority, { message: 'Invalid case priority' }).nullable(),
  status: z.enum(CrmCaseStatus, { message: 'Invalid case status' }).nullable(),
  type: z.enum(CrmCaseType, { message: 'Invalid case type' }).nullable(),
  createdAt: z.iso.datetime({ message: 'Invalid ISO datetime format for creation date' }).nullable(),
  updatedAt: z.iso.datetime({ message: 'Invalid ISO datetime format for update date' }).nullable(),
});

export type CrmCase = z.infer<typeof crmCaseSchema>;

export const crmCaseInsertSchema = crmCaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmCaseUpdateSchema = crmCaseInsertSchema.partial();
