import { z } from 'zod';

export const crmInvoiceItemSchema = z.object({
  id: z.uuid(),
  invoiceId: z.uuid(),
  productId: z.uuid(),
  price: z.coerce
    .number()
    .min(0, { error: 'Price must be at least 0' })
    .max(1000000, { error: 'Price must be at most 1,000,000' }),
  quantity: z
    .number()
    .min(1, { error: 'Quantity must be at least 1' })
    .max(10000, { error: 'Quantity must be at most 10,000' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmInvoiceItem = z.infer<typeof crmInvoiceItemSchema>;

export const crmInvoiceItemInsertSchema = crmInvoiceItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInvoiceItemUpdateSchema = crmInvoiceItemInsertSchema.partial();
