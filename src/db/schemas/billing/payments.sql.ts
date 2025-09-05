// Drizzle ORM schema for billing_payments
import { uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { billingSchema } from './index';

export const payments = billingSchema.table('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').notNull(), // FK to invoices
  amount: decimal('amount', { precision: 12, scale: 2 }),
  paymentMethod: varchar('payment_method', { length: 32 }),
  transactionId: varchar('transaction_id', { length: 64 }),
  status: varchar('status', { length: 32 }),
  paymentDate: timestamp('payment_date', { withTimezone: true }),
});
