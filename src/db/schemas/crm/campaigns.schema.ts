import { createInsertSchema } from 'drizzle-zod';
import { campaigns } from './campaigns.sql';
import z from 'zod';

export const insertCampaignSchema = createInsertSchema(campaigns, {
  startDate: z.date(),
  endDate: z.date(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCampaignSchema = insertCampaignSchema.partial();
