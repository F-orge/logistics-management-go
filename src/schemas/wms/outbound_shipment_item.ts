import { z } from 'zod';

export const wmsOutboundShipmentItemSchema = z.object({
  id: z.string(),
  outboundShipmentId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
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
