import { eq } from 'drizzle-orm';
import {
  index,
  numeric,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { selectSchema, serverAction } from '@/lib/server-utils';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';

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

// server actions
export const createProductAction = serverAction({ method: 'POST' })
  .inputValidator(insertProductSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmProducts)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateProductAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateProductSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmProducts)
        .set(data.payload)
        .where(eq(crmProducts.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectProductAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmProducts).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmProducts)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
