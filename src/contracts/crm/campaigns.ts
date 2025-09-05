import {
  campaignSchema,
  insertCampaignSchema,
  updateCampaignSchema,
} from '@/db/schemas/crm/campaigns.schema';
import { oc } from '@orpc/contract';
import z from 'zod';

export const create = oc.input(insertCampaignSchema).output(campaignSchema);

export const list = oc.output(campaignSchema);

export const view = oc.input(z.uuid()).output(campaignSchema);

export const update = oc
  .input(z.object({ id: z.uuid(), value: updateCampaignSchema }))
  .output(campaignSchema);

export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
