import { z } from 'zod';

export const crmOpportunityProductSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  opportunityId: z.uuid({ message: 'Invalid UUID format for opportunity ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int({ message: 'Quantity must be an integer' })
    .min(1, { message: 'Quantity must be at least 1' })
    .max(10000, { message: 'Quantity must be at most 10,000' }),
}).strict();

export type CrmOpportunityProduct = z.infer<typeof crmOpportunityProductSchema>;

export const crmOpportunityProductInsertSchema =
  crmOpportunityProductSchema.omit({
    id: true,
  });

export const crmOpportunityProductUpdateSchema =
  crmOpportunityProductInsertSchema.partial();
