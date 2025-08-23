/**
 * Generated Zod schema for crm_campaign_contacts (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { CrmCampaignContactsStatusOptions } from "../../types";

export const campaignContactsSchema = z.object({
  campaign: z.string(),
  contact: z.string(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  interaction_date: z.iso.datetime(),
  status: z.enum(CrmCampaignContactsStatusOptions),
  updated: z.iso.datetime().optional(),
});

export type CampaignContacts = z.infer<typeof campaignContactsSchema>;
