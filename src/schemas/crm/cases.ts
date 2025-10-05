import { z } from 'zod';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types';

export const crmCaseSchema = z.object({
  id: z
    .string()
    .min(1, { error: 'ID is required' })
    .max(255, { error: 'ID must be at most 255 characters' }),
  caseNumber: z
    .string()
    .min(1, { error: 'Case number is required' })
    .max(127, { error: 'Case number must be at most 127 characters' }),
  contactId: z.uuid().nullable(),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(1024, { error: 'Description must be at most 1024 characters' })
    .nullable(),
  ownerId: z
    .string()
    .min(1, { error: 'Owner ID is required' })
    .max(255, { error: 'Owner ID must be at most 255 characters' }),
  priority: z.enum(CrmCasePriority).nullable(),
  status: z.enum(CrmCaseStatus).nullable(),
  type: z.enum(CrmCaseType).nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmCase = z.infer<typeof crmCaseSchema>;

export const crmCaseInsertSchema = crmCaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmCaseUpdateSchema = crmCaseInsertSchema.partial();
