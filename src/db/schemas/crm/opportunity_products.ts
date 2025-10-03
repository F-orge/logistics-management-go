import { index, integer, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { crmOpportunities } from './opportunities';
import { crmProducts } from './products';
import { crmSchema } from './schema';
import { eq, and } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/server-utils';
import z from 'zod';

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

// zod schemas

export const insertOpportunityProductSchema = createInsertSchema(
  crmOpportunityProducts,
);
export const updateOpportunityProductSchema =
  insertOpportunityProductSchema.partial();

// server actions
export const createOpportunityProductAction = serverAction({ method: 'POST' })
  .inputValidator(insertOpportunityProductSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmOpportunityProducts)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateOpportunityProductAction = serverAction({ method: 'POST' })
  .inputValidator(
    z.object({
      opportunityId: z.string().uuid(),
      productId: z.string().uuid(),
      payload: updateOpportunityProductSchema,
    }),
  )
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmOpportunityProducts)
        .set(data.payload)
        .where(
          and(
            eq(crmOpportunityProducts.opportunityId, data.opportunityId),
            eq(crmOpportunityProducts.productId, data.productId),
          ),
        )
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectOpportunityProductAction = serverAction({
  method: 'GET',
})
  .inputValidator(
    selectSchema(createSelectSchema(crmOpportunityProducts).keyof()),
  )
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmOpportunityProducts)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
