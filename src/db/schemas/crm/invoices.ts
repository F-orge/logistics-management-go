import { date, index, numeric, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { entityFields, omitEntity } from '../helpers';
import { crmOpportunities } from './opportunities';
import { crmSchema } from './schema';
import { eq } from 'drizzle-orm';
import { selectSchema, serverAction } from '@/lib/utils';
import z from 'zod';

export const invoiceStatusEnum = crmSchema.enum('invoice_status', [
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled',
]);

export const paymentMethodEnum = crmSchema.enum('payment_method', [
  'credit-card',
  'bank-transfer',
  'cash',
  'check',
  'paypal',
  'stripe',
  'wire-transfer',
]);

export const crmInvoices = crmSchema.table(
  'invoices',
  {
    ...entityFields,
    opportunityId: uuid('opportunity_id').references(() => crmOpportunities.id),
    status: invoiceStatusEnum('status'),
    total: numeric('total', { precision: 15, scale: 2 }),
    issueDate: date('issue_date'),
    dueDate: date('due_date'),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    paymentMethod: paymentMethodEnum('payment_method'),
  },
  (table) => [
    index('idx_crm_invoices_opportunity_id').on(table.opportunityId),
    index('idx_crm_invoices_status').on(table.status),
    index('idx_crm_invoices_issue_date').on(table.issueDate),
    index('idx_crm_invoices_due_date').on(table.dueDate),
  ],
);

// zod schemas
export const insertInvoiceSchema =
  createInsertSchema(crmInvoices).omit(omitEntity);

export const updateInvoiceSchema = insertInvoiceSchema.partial();

// server actions
export const createInvoiceAction = serverAction({ method: 'POST' })
  .inputValidator(insertInvoiceSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .insert(crmInvoices)
        .values(data)
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const updateInvoiceAction = serverAction({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), payload: updateInvoiceSchema }))
  .handler(async ({ context, data }) => {
    try {
      const result = await context.db
        .update(crmInvoices)
        .set(data.payload)
        .where(eq(crmInvoices.id, data.id))
        .returning()
        .execute();

      return result[0];
    } catch (e) {
      throw e;
    }
  });

export const selectInvoiceAction = serverAction({
  method: 'GET',
})
  .inputValidator(selectSchema(createSelectSchema(crmInvoices).keyof()))
  .handler(async ({ context, data }) => {
    const results = await context.db
      .select()
      .from(crmInvoices)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return results;
  });
