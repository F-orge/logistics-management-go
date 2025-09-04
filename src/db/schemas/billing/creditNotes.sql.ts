// Drizzle ORM schema for billing_credit_notes
import { uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const creditNotes = billingSchema.table('credit_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').notNull(), // FK to invoices
  disputeId: uuid('dispute_id'), // FK to disputes (optional)
  amount: decimal('amount', { precision: 12, scale: 2 }),
  reason: varchar('reason', { length: 256 }),
  issueDate: timestamp('issue_date', { withTimezone: true }),
});
