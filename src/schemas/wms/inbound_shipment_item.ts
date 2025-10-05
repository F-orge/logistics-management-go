import { z } from 'zod';

export const wmsInboundShipmentItemSchema = z.object({
  id: z.uuid(),
  inboundShipmentId: z.uuid(),
  productId: z.uuid(),
  quantity: z.coerce.number(),
  receivedQuantity: z.coerce.number().nullable(),
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
