import { z } from 'zod';

export const wmsInboundShipmentItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  inboundShipmentId: z.uuid({
    message: 'Invalid UUID format for inbound shipment ID',
  }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  expectedQuantity: z.coerce
    .number({ message: 'Expected quantity must be a number' })
    .int({ message: 'Expected quantity must be an integer' })
    .min(0, { error: 'Expected quantity must be at least 0' })
    .max(1000000, { error: 'Expected quantity must be at most 1,000,000' }),
  receivedQuantity: z.coerce
    .number({ message: 'Received quantity must be a number' })
    .int({ message: 'Received quantity must be an integer' })
    .min(0, { error: 'Received quantity must be at least 0' })
    .max(1000000, { error: 'Received quantity must be at most 1,000,000' })
    .optional()
    .nullable(),
  discrepancyNotes: z
    .string({ message: 'Discrepancy notes must be a string' })
    .min(1, { error: 'Discrepancy notes cannot be empty' })
    .max(1024, { error: 'Discrepancy notes must be at most 1024 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  discrepancyQuantity: z.coerce
    .number({ message: 'Discrepancy quantity must be a number' })
    .int({ message: 'Discrepancy quantity must be an integer' })
    .min(-1000000, {
      error: 'Discrepancy quantity must be at least -1,000,000',
    })
    .max(1000000, { error: 'Discrepancy quantity must be at most 1,000,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
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
