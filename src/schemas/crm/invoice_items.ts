import { z } from 'zod';

export const crmInvoiceItemSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    invoiceId: z.uuid({ message: 'Invalid UUID format for invoice ID' }),
    productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
    price: z.coerce
      .number({ message: 'Price must be a number' })
      .min(0, { message: 'Price must be at least 0' })
      .max(1000000, { message: 'Price must be at most 1,000,000' }),
    quantity: z
      .number({ message: 'Quantity must be a number' })
      .int({ message: 'Quantity must be an integer' })
      .min(1, { message: 'Quantity must be at least 1' })
      .max(10000, { message: 'Quantity must be at most 10,000' }),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .nullable()
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .nullable()
      .optional()
      .nullable(),
  })
  .strict();

export type CrmInvoiceItem = z.infer<typeof crmInvoiceItemSchema>;

export const crmInvoiceItemInsertSchema = crmInvoiceItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInvoiceItemUpdateSchema = crmInvoiceItemInsertSchema.partial();
