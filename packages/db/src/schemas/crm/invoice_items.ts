import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';

export const InvoiceItemSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    invoiceId: z.uuid({ message: 'Invalid UUID format for invoice ID' }).check(
      fieldConfig({
        label: 'Invoice ID',
        description: 'The ID of the invoice this item belongs to.',
      }),
    ),
    productId: z.uuid({ message: 'Invalid UUID format for product ID' }).check(
      fieldConfig({
        label: 'Product ID',
        description: 'The ID of the product for this item.',
      }),
    ),
    price: z.coerce
      .number({ message: 'Price must be a number' })
      .min(0, { message: 'Price must be at least 0' })
      .max(1000000, { message: 'Price must be at most 1,000,000' })
      .check(
        fieldConfig({
          label: 'Price',
          description: 'The price of a single unit of the product.',
        }),
      ),
    quantity: z
      .number({ message: 'Quantity must be a number' })
      .int({ message: 'Quantity must be an integer' })
      .min(1, { message: 'Quantity must be at least 1' })
      .max(10000, { message: 'Quantity must be at most 10,000' })
      .check(
        fieldConfig({
          label: 'Quantity',
          description: 'The number of units for this invoice item.',
        }),
      ),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .nullable()
      .optional(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .nullable()
      .optional(),
  })
  .strict();

export type CrmInvoiceItem = z.infer<typeof InvoiceItemSchema>;

export const InvoiceItemInsertSchema = InvoiceItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const InvoiceItemUpdateSchema = InvoiceItemInsertSchema.partial();
