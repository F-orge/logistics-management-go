import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { campaigns } from './campaigns.sql';

export const campaignSchema = createSelectSchema(campaigns, {
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
});

export const insertCampaignSchema = campaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCampaignSchema = insertCampaignSchema.partial();
