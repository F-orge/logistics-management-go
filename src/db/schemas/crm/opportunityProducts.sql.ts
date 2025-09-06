// Drizzle ORM schema for crm_opportunity_products
import { integer, uuid } from 'drizzle-orm/pg-core';
import { crmSchema } from './index';
import { opportunities } from './opportunities.sql';
import { products } from './products.sql';

export const opportunityProducts = crmSchema.table('opportunity_products', {
  opportunityId: uuid('opportunity_id').references(() => opportunities.id), // FK to opportunities
  productId: uuid('product_id').references(() => products.id), // FK to products
  quantity: integer('quantity'),
});
