import { z } from 'zod';

export const crmOpportunityProductSchema = z.object({
  id: z.string(),
  opportunityId: z.string(),
  productId: z.string(),
  quantity: z.number(),
});

export type CrmOpportunityProduct = z.infer<typeof crmOpportunityProductSchema>;

export const crmOpportunityProductInsertSchema =
  crmOpportunityProductSchema.omit({
    id: true,
  });

export const crmOpportunityProductUpdateSchema =
  crmOpportunityProductInsertSchema.partial();
