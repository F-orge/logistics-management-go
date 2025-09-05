// Drizzle ORM schema for billing_rate_cards
import { boolean, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const rateCards = billingSchema.table('rate_cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 128 }).notNull(),
  serviceType: varchar('service_type', { length: 32 }).notNull(),
  isActive: boolean('is_active').notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }),
  validTo: timestamp('valid_to', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
