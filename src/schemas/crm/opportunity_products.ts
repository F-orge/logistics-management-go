import { z } from 'zod';

export const crmOpportunityProductSchema = z.object({
  id: z.uuid(),
  opportunityId: z.uuid(),
  productId: z.uuid(),
  quantity: z
    .number()
    .min(1, { error: 'Quantity must be at least 1' })
    .max(10000, { error: 'Quantity must be at most 10,000' }),
});

export type CrmOpportunityProduct = z.infer<typeof crmOpportunityProductSchema>;

export const crmOpportunityProductInsertSchema =
  crmOpportunityProductSchema.omit({
    id: true,
  });

export const crmOpportunityProductUpdateSchema =
  crmOpportunityProductInsertSchema.partial();
