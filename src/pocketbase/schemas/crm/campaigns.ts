/**
 * Generated Zod schema for crm_campaigns (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { CrmCampaignsStatusOptions } from "../../types";

export const campaignsSchema = z.object({
  budget: z.number().optional(),
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  end_date: z.iso.datetime().optional(),
  id: z.string(),
  name: z.string(),
  start_date: z.iso.datetime(),
  status: z.enum(CrmCampaignsStatusOptions).optional(),
  updated: z.iso.datetime().optional(),
});

export type Campaigns = z.infer<typeof campaignsSchema>;
