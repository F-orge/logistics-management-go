import { z } from 'zod';

export const crmCampaignSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Campaign name is required' })
    .max(255, { error: 'Campaign name must be at most 255 characters' }),
  budget: z.coerce
    .number()
    .min(0, { error: 'Budget must be at least 0' })
    .nullable(),
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
