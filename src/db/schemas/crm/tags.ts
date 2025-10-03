import { index, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';

export const crmTags = crmSchema.table(
  'tags',
  {
    ...entityFields,
    name: varchar('name', { length: 100 }).notNull().unique(),
  },
  (table) => [index('idx_crm_tags_name').on(table.name)],
);

// zod schemas
export const insertTagSchema = createInsertSchema(crmTags).omit(omitEntity);
export const updateTagSchema = insertTagSchema.partial();

// server actions
export const createTagAction = serverAction({ method: 'POST' })
  .inputValidator(insertTagSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmTags)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateTagAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateTagSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmTags)
        .set(data.payload)
        .where(eq(crmTags.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectTagAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmTags).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmTags)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
