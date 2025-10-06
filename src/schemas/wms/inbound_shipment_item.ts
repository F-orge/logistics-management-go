import { z } from 'zod';

export const wmsInboundShipmentItemSchema = z.object({
  id: z.uuid(),
  inboundShipmentId: z.uuid(),
  productId: z.uuid(),
  expectedQuantity: z
    .number()
    .min(0, { error: 'Expected quantity must be at least 0' })
    .max(1000000, { error: 'Expected quantity must be at most 1,000,000' }),
  receivedQuantity: z
    .number()
    .min(0, { error: 'Received quantity must be at least 0' })
    .max(1000000, { error: 'Received quantity must be at most 1,000,000' })
    .nullable(),
  discrepancyNotes: z.string().nullable().optional(),
  discrepancyQuantity: z.number().nullable().optional(),
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
