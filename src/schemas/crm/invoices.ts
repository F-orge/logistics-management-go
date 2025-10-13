import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { crmInvoiceItemInsertSchema } from './invoice_items';

export const crmInvoiceSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    issueDate: z
      .date({ message: 'Invalid ISO datetime format for issue date' })
      .check(
        fieldConfig({
          label: 'Issue Date',
          description: 'The date the invoice was issued.',
        }),
      )
      .optional()
      .nullable(),
    dueDate: z
      .date({ message: 'Invalid ISO datetime format for due date' })
      .check(
        fieldConfig({
          label: 'Due Date',
          description: 'The date the invoice is due.',
        }),
      )
      .optional()
      .nullable(),
    paidAt: z
      .date({ message: 'Invalid ISO datetime format for paid at date' })
      .check(
        fieldConfig({
          label: 'Paid At',
          description: 'The date the invoice was paid.',
        }),
      )
      .optional()
      .nullable(),
    sentAt: z
      .date({ message: 'Invalid ISO datetime format for sent at date' })
      .check(
        fieldConfig({
          label: 'Sent At',
          description: 'The date the invoice was sent to the customer.',
        }),
      )
      .optional()
      .nullable(),
    opportunityId: z
      .uuid({ message: 'Invalid UUID format for opportunity ID' })
      .check(
        fieldConfig({
          label: 'Opportunity ID',
          description: 'The ID of the opportunity related to this invoice.',
        }),
      )
      .optional()
      .nullable(),
    paymentMethod: z
      .enum(CrmPaymentMethod, { message: 'Invalid payment method' })
      .check(
        fieldConfig({
          label: 'Payment Method',
          description: 'The method used for payment.',
        }),
      )
      .optional()
      .nullable(),
    status: z
      .enum(CrmInvoiceStatus, { message: 'Invalid invoice status' })
      .check(
        fieldConfig({
          label: 'Status',
          description: 'The current status of the invoice.',
        }),
      )
      .optional()
      .nullable(),
    total: z.coerce
      .number({ message: 'Total must be a number' })
      .check(
        fieldConfig({
          label: 'Total',
          description: 'The total amount of the invoice.',
        }),
      )
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
