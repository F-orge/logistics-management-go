// Drizzle ORM schema for billing_rate_rules
import { uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const rateRules = billingSchema.table('rate_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  rateCardId: uuid('rate_card_id').notNull(), // FK to rate_cards
  condition: varchar('condition', { length: 32 }).notNull(),
  value: varchar('value', { length: 64 }).notNull(),
  price: decimal('price', { precision: 12, scale: 2 }),
  pricingModel: varchar('pricing_model', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
