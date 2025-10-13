import { z } from 'zod';

export const crmCampaignSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Campaign name must be a string' })
      .min(1, { message: 'Campaign name is required' })
      .max(255, { message: 'Campaign name must be at most 255 characters' }),
    budget: z.coerce
      .number({ message: 'Budget must be a number' })
      .min(0, { message: 'Budget must be at least 0' })
      .optional()
      .nullable(),
    startDate: z.coerce
      .date({ message: 'Invalid ISO datetime format for start date' })
      .optional()
      .nullable(),
    endDate: z.coerce
      .date({ message: 'Invalid ISO datetime format for end date' })
      .optional()
      .nullable(),
    createdAt: z.coerce
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z.coerce
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict();

export type CrmCampaign = z.infer<typeof crmCampaignSchema>;

export const crmCampaignInsertSchema = crmCampaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmCampaignUpdateSchema = crmCampaignInsertSchema.partial();
