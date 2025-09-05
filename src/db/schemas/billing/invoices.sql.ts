// Drizzle ORM schema for billing_invoices
import { date, decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const invoices = billingSchema.table('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull(), // FK to crm_companies
  quoteId: uuid('quote_id'), // FK to quotes (optional)
  status: varchar('status', { length: 32 }).notNull(),
  issueDate: date('issue_date').notNull(),
  dueDate: date('due_date').notNull(),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }),
  amountPaid: decimal('amount_paid', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
