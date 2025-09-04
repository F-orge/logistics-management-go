// Drizzle ORM schema for crm_opportunity_products
import { integer, uuid } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';

export const opportunityProducts = crmSchema.table('opportunity_products', {
  opportunityId: uuid('opportunity_id').primaryKey(), // FK to opportunities
  productId: uuid('product_id').primaryKey(), // FK to products
  quantity: integer('quantity'),
});
