import { z } from 'zod';

export const wmsInboundShipmentItemSchema = z.object({
  id: z.string(),
  inboundShipmentId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
  receivedQuantity: z.string().nullable(), // Numeric as string
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsInboundShipmentItem = z.infer<
  typeof wmsInboundShipmentItemSchema
>;

export const wmsInboundShipmentItemInsertSchema =
  wmsInboundShipmentItemSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const wmsInboundShipmentItemUpdateSchema =
  wmsInboundShipmentItemInsertSchema.partial();
