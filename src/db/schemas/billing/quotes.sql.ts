// Drizzle ORM schema for billing_quotes
import { uuid, varchar, decimal, text, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const quotes = billingSchema.table('quotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id'), // FK to crm_companies (optional)
  originDetails: text('origin_details'),
  destinationDetails: text('destination_details'),
  weight: decimal('weight', { precision: 12, scale: 2 }),
  length: decimal('length', { precision: 12, scale: 2 }),
  width: decimal('width', { precision: 12, scale: 2 }),
  height: decimal('height', { precision: 12, scale: 2 }),
  quotedPrice: decimal('quoted_price', { precision: 12, scale: 2 }),
  serviceLevel: varchar('service_level', { length: 32 }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  status: varchar('status', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
