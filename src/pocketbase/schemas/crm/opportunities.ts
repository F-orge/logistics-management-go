/**
 * Generated Zod schema for crm_opportunities (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { CrmOpportunitiesStageOptions } from '../../types';

export const opportunitiesSchema = z.object({
  amount: z.number(),
  close_date: z.iso.datetime().optional(),
  company: z.string().optional(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  name: z.string(),
  primary_contact: z.string().optional(),
  probability: z.number().optional(),
  stage: z.enum(CrmOpportunitiesStageOptions),
  updated: z.iso.datetime().optional(),
});

export type Opportunities = z.infer<typeof opportunitiesSchema>;
