import { z } from 'zod';

export const wmsOutboundShipmentItemSchema = z.object({
  id: z.uuid(),
  outboundShipmentId: z.uuid(),
  productId: z.uuid(),
  quantity: z
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsOutboundShipmentItem = z.infer<
  typeof wmsOutboundShipmentItemSchema
>;

export const wmsOutboundShipmentItemInsertSchema =
  wmsOutboundShipmentItemSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const wmsOutboundShipmentItemUpdateSchema =
  wmsOutboundShipmentItemInsertSchema.partial();
