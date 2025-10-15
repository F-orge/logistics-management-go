import { z } from 'zod'

export const wmsOutboundShipmentItemSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  outboundShipmentId: z.uuid({
    message: 'Invalid UUID format for outbound shipment ID',
  }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  quantityShipped: z.coerce
    .number({ message: 'Quantity shipped must be a number' })
    .int({ message: 'Quantity shipped must be an integer' })
    .min(0, { error: 'Quantity shipped must be at least 0' })
    .max(1000000, { error: 'Quantity shipped must be at most 1,000,000' }),
  batchId: z
    .uuid({ message: 'Invalid UUID format for batch ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  salesOrderItemId: z.uuid({
    message: 'Invalid UUID format for sales order item ID',
  }),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type WmsOutboundShipmentItem = z.infer<typeof wmsOutboundShipmentItemSchema>

export const wmsOutboundShipmentItemInsertSchema = wmsOutboundShipmentItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const wmsOutboundShipmentItemUpdateSchema = wmsOutboundShipmentItemInsertSchema.partial()
