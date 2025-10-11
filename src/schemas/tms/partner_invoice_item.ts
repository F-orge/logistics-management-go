import { z } from 'zod';

export const tmsPartnerInvoiceItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  partnerInvoiceId: z.uuid({
    message: 'Invalid UUID format for partner invoice ID',
  }),
  shipmentLegId: z.uuid({ message: 'Invalid UUID format for shipment leg ID' }),
  amount: z.coerce
    .number({ message: 'Amount must be a number' })
    .min(0, { error: 'Amount must be at least 0' })
    .max(1000000, { error: 'Amount must be at most 1,000,000' }),
});

export type TmsPartnerInvoiceItem = z.infer<typeof tmsPartnerInvoiceItemSchema>;

export const tmsPartnerInvoiceItemInsertSchema =
  tmsPartnerInvoiceItemSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const tmsPartnerInvoiceItemUpdateSchema =
  tmsPartnerInvoiceItemInsertSchema.partial();
