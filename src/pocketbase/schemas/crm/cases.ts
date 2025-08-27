/**
 * Generated Zod schema for crm_cases (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { CrmCasesPriorityOptions, CrmCasesStatusOptions } from '../../types';

export const casesSchema = z.object({
  closed_at: z.iso.datetime().optional(),
  contact: z.string().optional(),
  created: z.iso.datetime().optional(),
  description: z.string(),
  id: z.string(),
  priority: z.enum(CrmCasesPriorityOptions).optional(),
  status: z.enum(CrmCasesStatusOptions),
  subject: z.string(),
  updated: z.iso.datetime().optional(),
});

export type Cases = z.infer<typeof casesSchema>;
