import { z } from 'zod';

export const crmCampaignSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Campaign name must be a string' })
    .min(1, { message: 'Campaign name is required' })
    .max(255, { message: 'Campaign name must be at most 255 characters' }),
  budget: z.coerce
    .number({ message: 'Budget must be a number' })
    .min(0, { message: 'Budget must be at least 0' })
    .nullable(),
  startDate: z.iso.datetime({ message: 'Invalid ISO datetime format for start date' }).nullable(),
  endDate: z.iso.datetime({ message: 'Invalid ISO datetime format for end date' }).nullable(),
  createdAt: z.iso.datetime({ message: 'Invalid ISO datetime format for creation date' }).nullable(),
  updatedAt: z.iso.datetime({ message: 'Invalid ISO datetime format for update date' }).nullable(),
});

export type CrmCampaign = z.infer<typeof crmCampaignSchema>;

export const crmCampaignInsertSchema = crmCampaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmCampaignUpdateSchema = crmCampaignInsertSchema.partial();
