import { index, integer, uuid } from 'drizzle-orm/pg-core';
import { crmOpportunities } from './opportunities';
import { crmProducts } from './products';
import { crmSchema } from './schema';

export const crmOpportunityProducts = crmSchema.table(
  'opportunity_products',
  {
    opportunityId: uuid('opportunity_id')
      .notNull()
      .references(() => crmOpportunities.id),
    productId: uuid('product_id')
      .notNull()
      .references(() => crmProducts.id),
    quantity: integer('quantity').notNull(),
  },
  (table) => [
    index('idx_crm_opportunity_products_opportunity_id').on(
      table.opportunityId,
    ),
    index('idx_crm_opportunity_products_product_id').on(table.productId),
  ],
);
