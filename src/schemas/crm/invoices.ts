import { z } from 'zod';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { crmInvoiceItemInsertSchema } from './invoice_items';

export const crmInvoiceSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    issueDate: z
      .date({ message: 'Invalid ISO datetime format for issue date' })
      .optional()
      .nullable(),
    dueDate: z
      .date({ message: 'Invalid ISO datetime format for due date' })
      .optional()
      .nullable(),
    paidAt: z
      .date({ message: 'Invalid ISO datetime format for paid at date' })
      .optional()
      .nullable(),
    sentAt: z
      .date({ message: 'Invalid ISO datetime format for sent at date' })
      .optional()
      .nullable(),
    opportunityId: z
      .uuid({ message: 'Invalid UUID format for opportunity ID' })
      .optional()
      .nullable(),
    paymentMethod: z
      .enum(CrmPaymentMethod, { message: 'Invalid payment method' })
      .optional()
      .nullable(),
    status: z
      .enum(CrmInvoiceStatus, { message: 'Invalid invoice status' })
      .optional()
      .nullable(),
    total: z.coerce
      .number({ message: 'Total must be a number' })
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict();

export type CrmInvoice = z.infer<typeof crmInvoiceSchema>;

export const crmInvoiceInsertSchema = crmInvoiceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    items: z.array(crmInvoiceItemInsertSchema).optional().nullable(),
  });

export const crmInvoiceUpdateSchema = crmInvoiceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();
