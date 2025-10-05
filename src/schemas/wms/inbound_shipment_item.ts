import { z } from 'zod';

export const wmsInboundShipmentItemSchema = z.object({
  id: z.uuid(),
  inboundShipmentId: z
    .string()
    .min(1, { error: 'Inbound shipment ID is required' })
    .max(255, { error: 'Inbound shipment ID must be at most 255 characters' }),
  productId: z
    .string()
    .min(1, { error: 'Product ID is required' })
    .max(255, { error: 'Product ID must be at most 255 characters' }),
  quantity: z
    .number()
    .min(0, { error: 'Quantity must be at least 0' })
    .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
  receivedQuantity: z
    .number()
    .min(0, { error: 'Received quantity must be at least 0' })
    .max(1000000, { error: 'Received quantity must be at most 1,000,000' })
    .nullable(),
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
