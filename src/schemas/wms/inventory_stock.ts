import { z } from 'zod'
import { WmsInventoryStockStatusEnum } from '@/db/types'

export const wmsInventoryStockSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
    locationId: z.uuid({ message: 'Invalid UUID format for location ID' }),
    quantity: z
      .number({ message: 'Quantity must be a number' })
      .int({ message: 'Quantity must be an integer' })
      .min(0, { error: 'Quantity must be at least 0' })
      .max(1000000, { error: 'Quantity must be at most 1,000,000' }),
    reservedQuantity: z
      .number({ message: 'Reserved quantity must be a number' })
      .int({ message: 'Reserved quantity must be an integer' })
      .min(0, { error: 'Reserved quantity must be at least 0' })
      .max(1000000, { error: 'Reserved quantity must be at most 1,000,000' }),
    availableQuantity: z
      .number({ message: 'Available quantity must be a number' })
      .int({ message: 'Available quantity must be an integer' })
      .min(0, { error: 'Available quantity must be at least 0' })
      .max(1000000, { error: 'Available quantity must be at most 1,000,000' })
      .nullable()
      .optional(),
    batchId: z.uuid({ message: 'Invalid UUID format for batch ID' }).nullable().optional(),
    status: z
      .nativeEnum(WmsInventoryStockStatusEnum, {
        message: 'Invalid inventory stock status',
      })
      .nullable()
      .optional(),
    lastCountedAt: z
      .date({ message: 'Invalid date format for last counted at' })
      .nullable()
      .optional(),
    lastMovementAt: z.date({ message: 'Invalid date format for last movement at' }).optional(),
    createdAt: z.date({ message: 'Invalid date format for created at' }).optional(),
    updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional(),
  })
  .refine((data) => data.reservedQuantity <= data.quantity, {
    message: 'Reserved quantity cannot exceed total quantity',
    path: ['reservedQuantity'],
  })
  .refine((data) => !data.lastCountedAt || data.lastCountedAt <= new Date(), {
    message: 'Last counted date cannot be in the future',
    path: ['lastCountedAt'],
  })

export type WmsInventoryStock = z.infer<typeof wmsInventoryStockSchema>

// Schema for creating new inventory records (excludes auto-generated fields)
export const wmsInventoryStockInsertSchema = wmsInventoryStockSchema.omit({
  id: true,
  availableQuantity: true, // Auto-calculated field
  lastMovementAt: true, // Auto-generated field
  createdAt: true,
  updatedAt: true,
})

// Schema for updating inventory (only allow quantity updates and status changes)
export const wmsInventoryStockUpdateSchema = z
  .object({
    quantity: z.coerce.number().int().min(0).optional(),
    reservedQuantity: z.coerce.number().int().min(0).optional(),
    status: z.enum(WmsInventoryStockStatusEnum).nullable().optional(),
    lastCountedAt: z.date().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.quantity !== undefined && data.reservedQuantity !== undefined) {
        return data.reservedQuantity <= data.quantity
      }
      return true
    },
    {
      message: 'Reserved quantity cannot exceed total quantity',
      path: ['reservedQuantity'],
    },
  )

// Schema for API responses (includes all fields)
export const wmsInventoryStockResponseSchema = wmsInventoryStockSchema

// Schema for inventory adjustments
export const wmsInventoryStockAdjustmentSchema = z.object({
  productId: z.uuid(),
  locationId: z.uuid(),
  quantityChange: z.coerce.number().int(),
  reason: z.string().min(1).max(255),
  notes: z.string().max(1024).optional(),
})

// Type exports
export type WmsInventoryStockInsert = z.infer<typeof wmsInventoryStockInsertSchema>
export type WmsInventoryStockUpdate = z.infer<typeof wmsInventoryStockUpdateSchema>
export type WmsInventoryStockResponse = z.infer<typeof wmsInventoryStockResponseSchema>
export type WmsInventoryStockAdjustment = z.infer<typeof wmsInventoryStockAdjustmentSchema>
