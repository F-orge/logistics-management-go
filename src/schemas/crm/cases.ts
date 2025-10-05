import { z } from 'zod';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types';

export const crmCaseSchema = z.object({
  id: z.string(),
  caseNumber: z.string(),
  contactId: z.uuid().nullable(),
  description: z.string().nullable(),
  ownerId: z.string(),
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
