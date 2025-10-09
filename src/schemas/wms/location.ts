import { z } from 'zod';
import { WmsLocationTypeEnum } from '@/db/types';

export const wmsLocationSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { error: 'Name is required' })
    .max(127, { error: 'Name must be at most 127 characters' }),
  type: z.enum(WmsLocationTypeEnum, { message: 'Invalid location type' }),
  barcode: z
    .string({ message: 'Barcode must be a string' })
    .min(1, { error: 'Barcode cannot be empty' })
    .max(255, { error: 'Barcode must be at most 255 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  hazmatApproved: z
    .boolean({ message: 'Hazmat approved must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isActive: z
    .boolean({ message: 'Is active must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isPickable: z
    .boolean({ message: 'Is pickable must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isReceivable: z
    .boolean({ message: 'Is receivable must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  level: z
    .number({ message: 'Level must be a number' })
    .int({ message: 'Level must be an integer' })
    .min(0, { error: 'Level must be at least 0' })
    .max(10, { error: 'Level must be at most 10' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  maxPallets: z
    .number({ message: 'Max pallets must be a number' })
    .int({ message: 'Max pallets must be an integer' })
    .min(0, { error: 'Max pallets must be at least 0' })
    .max(1000, { error: 'Max pallets must be at most 1000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  maxVolume: z
    .number({ message: 'Max volume must be a number' })
    .min(0, { error: 'Max volume must be at least 0' })
    .max(100000, { error: 'Max volume must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  maxWeight: z
    .number({ message: 'Max weight must be a number' })
    .min(0, { error: 'Max weight must be at least 0' })
    .max(100000, { error: 'Max weight must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  parentLocationId: z
    .uuid({ message: 'Invalid UUID format for parent location ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  path: z
    .string({ message: 'Path must be a string' })
    .min(1, { error: 'Path cannot be empty' })
    .max(1024, { error: 'Path must be at most 1024 characters' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  temperatureControlled: z
    .boolean({ message: 'Temperature controlled must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  xCoordinate: z
    .number({ message: 'X coordinate must be a number' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  yCoordinate: z
    .number({ message: 'Y coordinate must be a number' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  zCoordinate: z
    .number({ message: 'Z coordinate must be a number' })
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

export type WmsLocation = z.infer<typeof wmsLocationSchema>;

export const wmsLocationInsertSchema = wmsLocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsLocationUpdateSchema = wmsLocationInsertSchema.partial();
