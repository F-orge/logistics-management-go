import {
  index,
  numeric,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { entityFields } from '../helpers';
import { crmSchema } from './schema';
import { createInsertSchema } from 'drizzle-zod';
import { omitEntity } from '../helpers';

export const productTypeEnum = crmSchema.enum('product_type', [
  'service',
  'good',
  'digital',
  'subscription',
]);

export const crmProducts = crmSchema.table(
  'products',
  {
    ...entityFields,
    name: varchar('name', { length: 255 }).notNull(),
    sku: varchar('sku', { length: 100 }).unique(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    type: productTypeEnum('type').default('good'),
    description: text('description'),
  },
  (table) => [
    index('idx_crm_products_sku').on(table.sku),
    index('idx_crm_products_type').on(table.type),
    index('idx_crm_products_name').on(table.name),
  ],
);

// zod schemas

export const insertProductSchema =
  createInsertSchema(crmProducts).omit(omitEntity);
export const updateProductSchema = insertProductSchema.partial();
