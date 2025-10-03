import {
  boolean,
  index,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from '../better-auth';
import { entityFields, omitEntity } from '../helpers';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/server-utils';
import z from 'zod';

export const crmNotifications = crmSchema.table(
  'notifications',
  {
    ...entityFields,
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    message: text('message').notNull(),
    isRead: boolean('is_read').default(false),
    link: varchar('link', { length: 255 }),
  },
  (table) => [
    index('idx_crm_notifications_user_id').on(table.userId),
    index('idx_crm_notifications_is_read').on(table.isRead),
    index('idx_crm_notifications_created_at').on(table.createdAt),
  ],
);

// zod schemas

export const insertNotificationSchema =
  createInsertSchema(crmNotifications).omit(omitEntity);
export const updateNotificationSchema = insertNotificationSchema.partial();

// server actions
export const createNotificationAction = serverAction({ method: 'POST' })
  .inputValidator(insertNotificationSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmNotifications)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateNotificationAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateNotificationSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmNotifications)
        .set(data.payload)
        .where(eq(crmNotifications.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectNotificationAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmNotifications).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmNotifications)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
