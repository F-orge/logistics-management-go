import { index, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmCases } from './cases';
import { crmContacts } from './contacts';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';

export const interactionTypeEnum = crmSchema.enum('interaction_type', [
  'call',
  'meeting',
  'text',
  'email',
]);

export const crmInteractions = crmSchema.table(
  'interactions',
  {
    ...entityFields,
    contactId: uuid('contact_id')
      .notNull()
      .references(() => crmContacts.id),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    caseId: uuid('case_id').references(() => crmCases.id),
    type: interactionTypeEnum('type'),
    outcome: varchar('outcome', { length: 128 }),
    notes: text('notes'),
    interactionDate: timestamp('interaction_date', { withTimezone: true }),
  },
  (table) => [
    index('idx_crm_interactions_contact_id').on(table.contactId),
    index('idx_crm_interactions_user_id').on(table.userId),
    index('idx_crm_interactions_case_id').on(table.caseId),
    index('idx_crm_interactions_type').on(table.type),
    index('idx_crm_interactions_interaction_date').on(table.interactionDate),
  ],
);

// zod schemas
export const insertInteractionSchema =
  createInsertSchema(crmInteractions).omit(omitEntity);

export const updateInteractionSchema = insertInteractionSchema.partial();

// server actions
export const createInteractionAction = serverAction({ method: 'POST' })
  .inputValidator(insertInteractionSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmInteractions)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateInteractionAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateInteractionSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmInteractions)
        .set(data.payload)
        .where(eq(crmInteractions.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectInteractionAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmInteractions).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmInteractions)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
