/**
 * Generated Zod schema for crm_interactions (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { CrmInteractionsTypeOptions } from "../../types";

export const interactionsSchema = z.object({
  contact: z.string().optional(),
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  id: z.string(),
  interaction_date: z.iso.datetime(),
  opportunity: z.string().optional(),
  subject: z.string().optional(),
  type: z.enum(CrmInteractionsTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type Interactions = z.infer<typeof interactionsSchema>;
