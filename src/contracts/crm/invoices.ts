import { oc } from '@orpc/contract';
import z from 'zod';
import {
  insertInvoiceSchema,
  invoiceSchema,
  updateInvoiceSchema,
} from '@/db/schemas/crm/invoices.schema';

export const create = oc.input(insertInvoiceSchema).output(invoiceSchema);
export const list = oc.output(z.array(invoiceSchema));
export const view = oc.input(z.uuid()).output(invoiceSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateInvoiceSchema }))
  .output(invoiceSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
