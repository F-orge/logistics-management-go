import { createSelectSchema } from 'drizzle-zod';
import { invoices } from './invoices.sql';
import z from 'zod';

export const invoiceSchema = createSelectSchema(invoices, {
  issueDate: z.date().nullable().optional(),
  dueDate: z.date().nullable().optional(),
});

export const insertInvoiceSchema = invoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInvoiceSchema = insertInvoiceSchema.partial();
