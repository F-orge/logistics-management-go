// Drizzle ORM schema for billing_surcharges
import {
  uuid,
  varchar,
  decimal,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const surcharges = billingSchema.table('surcharges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 64 }).notNull(),
  type: varchar('type', { length: 32 }).notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  calculationMethod: varchar('calculation_method', { length: 32 }),
  isActive: boolean('is_active').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
