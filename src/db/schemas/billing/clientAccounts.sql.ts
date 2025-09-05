// Drizzle ORM schema for billing_client_accounts
import { uuid, decimal, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const clientAccounts = billingSchema.table('client_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull(), // FK to crm_companies
  creditLimit: decimal('credit_limit', { precision: 12, scale: 2 }),
  availableCredit: decimal('available_credit', { precision: 12, scale: 2 }),
  walletBalance: decimal('wallet_balance', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
