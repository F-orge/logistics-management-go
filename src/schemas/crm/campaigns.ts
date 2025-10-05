import { z } from 'zod';

export const crmCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  budget: z.string().nullable(), // Numeric as string
  startDate: z.iso.datetime().nullable(),
  endDate: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmCampaign = z.infer<typeof crmCampaignSchema>;

export const crmCampaignInsertSchema = crmCampaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmCampaignUpdateSchema = crmCampaignInsertSchema.partial();
