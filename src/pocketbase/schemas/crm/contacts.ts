/**
 * Generated Zod schema for crm_contacts (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { CrmContactsStatusOptions } from '../../types';

export const contactsSchema = z.object({
  birth_date: z.iso.datetime().optional(),
  company: z.string().optional(),
  created: z.iso.datetime().optional(),
  email: z.email(),
  first_name: z.string(),
  id: z.string(),
  job_title: z.string().optional(),
  last_name: z.string(),
  lead_source: z.string().optional(),
  phone_number: z.string().optional(),
  status: z.enum(CrmContactsStatusOptions).optional(),
  updated: z.iso.datetime().optional(),
});

export type Contacts = z.infer<typeof contactsSchema>;
