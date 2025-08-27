/**
 * Generated Zod schema for crm_leads (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { CrmLeadsLeadStatusOptions } from '../../types';

export const leadsSchema = z.object({
  company_name: z.string().optional(),
  converted_to_contact: z.string().optional(),
  created: z.iso.datetime().optional(),
  email: z.email(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  lead_score: z.number().optional(),
  lead_source: z.string().optional(),
  lead_status: z.enum(CrmLeadsLeadStatusOptions).optional(),
  phone_number: z.string().optional(),
  updated: z.iso.datetime().optional(),
});

export type Leads = z.infer<typeof leadsSchema>;
