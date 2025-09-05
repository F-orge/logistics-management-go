import { createSelectSchema } from 'drizzle-zod';
import { campaigns } from './campaigns.sql';
import z from 'zod';

export const campaignSchema = createSelectSchema(campaigns, {
  startDate: z.date(),
  endDate: z.date(),
});

export const insertCampaignSchema = campaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCampaignSchema = insertCampaignSchema.partial();
